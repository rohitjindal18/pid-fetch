const config = {
  url: 'http://10.47.1.8',
  port: '31200',
  path: 'views'
}
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.type === "fetchPid") {
      var xhr = new XMLHttpRequest();
      const pids = request.payload && request.payload.replace(/ /g, '');
      fetch(`${config.url}:${config.port}/${config.path}?viewNames=product_base_info&entityIds=${pids}`, {
        headers: {
          'z-clientId': 'w3.merch',
          'z-timestamp': '00:00:00',
          'z-requestId': '1234'
        }
      }).then(function r(response) {
        response.json().then(function zuluResponse(result) {
          const views = result && result.entityViews;
          const resp = (views || []).map(view => {
            return view.view.static_images[0];
          });
          // Download all images
          for (const image of resp) {
            chrome.downloads.download({ url: image },
              function (id) {
              });
          }
        });
      });
    }
  }
);