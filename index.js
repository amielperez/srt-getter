srtRequests = {}

chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
  if (requestIsForSrt(details)){
    chrome.tabs.query({ active: true }, function(results) {
      var currentTab = results.shift()
      var tabId = currentTab.id
      if(!srtRequests.hasOwnProperty(tabId)){
        srtRequests[tabId] = {}
      }
      srtRequests[tabId][details.url] = {
        url: details.url,
        suggestedFilename: currentTab.title + ".srt"
      }
      chrome.pageAction.show(tabId)
    })
  }
  blockingResponse = {};
  blockingResponse.requestHeaders = details.requestHeaders;
  return blockingResponse;
},
{urls: [ "<all_urls>" ]},['requestHeaders','blocking']);

chrome.pageAction.onClicked.addListener((tab) => {
  srtRequestsForTab = srtRequests[tab.id]
  if(srtRequestsForTab){
    downloadAllSrts(srtRequestsForTab)
  }
})

function downloadAllSrts(cachedRequests){
  for(var key in cachedRequests){
    var cachedRequest = cachedRequests[key]
    chrome.downloads.download({
      url: cachedRequest.url,
      saveAs: true,
      filename: cachedRequest.suggestedFilename
    })
  }
}

function downloadSrt(cachedSrtRequest){
  chrome.tabs.create({
    url: cachedSrtRequest.url
  })
}

function requestIsForSrt(request){
  // TODO: improve how this is determined, as some url's might not even have srt in their name
  if(/\.srt(\?*)/.test(request.url)){
    return true
  }else {
    return false
  }
}
