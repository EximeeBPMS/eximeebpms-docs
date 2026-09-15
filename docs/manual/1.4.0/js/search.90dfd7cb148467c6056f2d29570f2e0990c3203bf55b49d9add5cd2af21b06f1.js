"use strict";

(function () {
  var PAGE_SIZE = 10;
  var DEBOUNCE_MS = 150;

  var input = document.querySelector(".search-input");
  var resultsPanel = document.querySelector(".search-results");
  var list = resultsPanel && resultsPanel.querySelector("ul");
  var closeBtn = document.querySelector(".search-close");
  var underlay = document.querySelector(".search-underlay");
  var prevBtn = document.querySelector(".search-results button.page.previous");
  var nextBtn = document.querySelector(".search-results button.page.next");

  if (!input || !resultsPanel || !list) {
    return;
  }

  var pagefind = null;
  var pagefindLoading = null;
  var currentResults = [];
  var currentPage = 0;
  var debounceTimer = null;

  function pagefindBase() {
    return window.__PAGEFIND_BASE__ || "/pagefind/";
  }

  function loadPagefind() {
    if (pagefind) {
      return Promise.resolve(pagefind);
    }
    if (!pagefindLoading) {
      pagefindLoading = import(pagefindBase() + "pagefind.js").then(function (mod) {
        return mod.init().then(function () {
          pagefind = mod;
          return pagefind;
        });
      });
    }
    return pagefindLoading;
  }

  function closeSearch() {
    document.body.classList.remove("search-open");
  }

  function openSearch() {
    document.body.classList.add("search-open");
  }

  function setPaginationDisabled(prevDisabled, nextDisabled) {
    if (prevBtn) {
      prevBtn.disabled = !!prevDisabled;
    }
    if (nextBtn) {
      nextBtn.disabled = !!nextDisabled;
    }
  }

  function renderError(message) {
    list.innerHTML = '<li class="search-error">' + message + "</li>";
    setPaginationDisabled(true, true);
  }

  function renderEmpty() {
    list.innerHTML = '<li class="no-results">no results</li>';
    setPaginationDisabled(true, true);
  }

  function escapeHtml(value) {
    var div = document.createElement("div");
    div.textContent = value == null ? "" : value;
    return div.innerHTML;
  }

  function renderPage() {
    var start = currentPage * PAGE_SIZE;
    var pageResults = currentResults.slice(start, start + PAGE_SIZE);

    if (!pageResults.length) {
      renderEmpty();
      return;
    }

    Promise.all(
      pageResults.map(function (result) {
        return result.data();
      })
    ).then(function (dataList) {
      list.innerHTML = dataList
        .map(function (data) {
          var thumbnail = "";
          if (data.meta && data.meta.image) {
            thumbnail =
              '<a class="thumbnail" href="' +
              data.url +
              '"><img src="' +
              data.meta.image +
              '" /></a>';
          }
          return (
            '<li><h2><a href="' +
            data.url +
            '">' +
            escapeHtml((data.meta && data.meta.title) || data.url) +
            '</a></h2><div class="description' +
            (thumbnail ? " with-thumbnail" : "") +
            '">' +
            thumbnail +
            "<p>" +
            data.excerpt +
            "</p></div></li>"
          );
        })
        .join("");

      setPaginationDisabled(currentPage === 0, start + PAGE_SIZE >= currentResults.length);
      list.scrollTop = 0;
    });
  }

  function runSearch(term) {
    if (!term) {
      closeSearch();
      return;
    }

    loadPagefind()
      .then(function (pf) {
        return pf.search(term);
      })
      .then(function (search) {
        currentResults = search.results;
        currentPage = 0;
        openSearch();
        if (!currentResults.length) {
          renderEmpty();
          return;
        }
        renderPage();
      })
      .catch(function (error) {
        console.error("pagefind search", error);
        openSearch();
        renderError((error && error.message) || "search unavailable");
      });
  }

  input.addEventListener("input", function () {
    var term = input.value.trim();
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(function () {
      runSearch(term);
    }, DEBOUNCE_MS);
  });

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      window.clearTimeout(debounceTimer);
      runSearch(input.value.trim());
    } else if (event.key === "Escape") {
      closeSearch();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function (event) {
      event.preventDefault();
      closeSearch();
      input.value = "";
    });
  }

  if (underlay) {
    underlay.addEventListener("click", function (event) {
      event.preventDefault();
      closeSearch();
      input.value = "";
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function (event) {
      event.preventDefault();
      if (currentPage > 0) {
        currentPage -= 1;
        renderPage();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (event) {
      event.preventDefault();
      if ((currentPage + 1) * PAGE_SIZE < currentResults.length) {
        currentPage += 1;
        renderPage();
      }
    });
  }

  input.value = "";
})();
