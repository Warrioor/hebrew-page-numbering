// Check if a document is open
if (app.documents.length > 0) {
    var doc = app.activeDocument;

    // Set document binding to right-to-left
    doc.documentPreferences.pageBinding = PageBindingOptions.RIGHT_TO_LEFT;

    // Loop through all pages and adjust numbering settings
    for (var i = 0; i < doc.pages.length; i++) {
        var page = doc.pages[i];
        
        // Get the master spread applied to the current page
        var masterSpread = page.appliedMaster;
        
        if (masterSpread != null) {
            // Loop through the master spread to find page number text frames
            for (var j = 0; j < masterSpread.textFrames.length; j++) {
                var textFrame = masterSpread.textFrames[j];
                var content = textFrame.contents;

                // Check if it's a page number marker and align accordingly
                if (content.includes("Current Page Number")) {
                    if (page.side == PageSideOptions.RIGHT_HAND) {
                        textFrame.paragraphs[0].justification = Justification.RIGHT_ALIGN;
                    } else {
                        textFrame.paragraphs[0].justification = Justification.LEFT_ALIGN;
                    }
                }
            }
        }
    }

    alert("Page numbering adjusted for Hebrew layout (RTL)!");
} else {
    alert("No document is open. Please open a document and try again.");
}