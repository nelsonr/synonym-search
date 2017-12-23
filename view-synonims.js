browser.contextMenus.create({
    id: "view-synonims",
    title: "View synonims for \"%s\"",
    contexts: ["selection"]
}, onMenuCreated);

browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "view-synonims":
            browser.tabs.create({ url: thesaurus(info.selectionText) }).then(onNewTab, onNewTabError);
            break;
    
        default:
            break;
    }
});

function onMenuCreated() {
    if (browser.runtime.lastError) {
      console.log(`Error: ${browser.runtime.lastError}`);
    } else {
      console.log("View synonims context menu created successfully");
    }
}

function thesaurus(term) {
    return `http://www.thesaurus.com/browse/${term}?s=t`;
}

function onNewTab(tab) {
    console.log(`Created new tab: ${tab.id}`)
}

function onNewTabError(error) {
    console.log(`Error: ${error}`);
}