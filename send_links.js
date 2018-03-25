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
          const pidImages = (views || []).map(view => {
            return {
              entityId: view.entityId,
              image: view.view.static_images[0]
            };
          });
          const enteredPids = (request.payload || '').split(',');
          const validPids = pidImages.map(pid => pid.entityId);
          const invalidPids = [];
          for (let i = 0; i < enteredPids.length; i++) {
            if (validPids.indexOf(enteredPids[i]) === -1) {
              invalidPids.push(enteredPids[i]);
            }
          }
          // Download all images
          for (const pidImage of pidImages) {
            chrome.downloads.download({ url: pidImage.image },
              function (id) {
              });
          }

          if (invalidPids.length > 0) {
            alert(`Unable to download image for ${invalidPids.join()}`)
          }
        });
      })
        .error((error) => {
          alert('errr');
        });
    }
  }
);