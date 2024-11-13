/*!
 * Hebrew Page Numbering Script for Adobe InDesign
 * Version: 1.0.1
 * Author: [Your Name]
 *
 * This file is part of the Hebrew Page Numbering project.
 * 
 * This project is licensed under the GNU General Public License v3.0.
 * You are free to use, modify, and distribute it under the same license.
 * For more details, see the LICENSE file or visit:
 * https://www.gnu.org/licenses/gpl-3.0.html
 */

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

                // Ensure content is defined and is a string
                if (content && typeof content === "string" && content.toString().includes("Current Page Number")) {
                    // Check the side of the page and adjust justification
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
