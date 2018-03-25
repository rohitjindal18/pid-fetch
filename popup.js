// This extension demonstrates using chrome.downloads.download() to
// download URLs.
var visibleLinks = [];

// Download all visible checked links.
function downloadCheckedLinks() {
  chrome.runtime.sendMessage({
    type: 'fetchPid',
    payload: visibleLinks
  }, function download(response) {
  })
}

// Re-filter allLinks into visibleLinks and reshow visibleLinks.
function filterLinks() {
  var filterValue = document.getElementById('filter').value;
  visibleLinks = filterValue;
  // alert(visibleLinks);
}

// Set up event handlers and inject send_links.js into all frames in the active
// tab.
window.onload = function () {
  document.getElementById('filter').onkeyup = filterLinks;
  document.getElementById('download0').onclick = downloadCheckedLinks;
};
