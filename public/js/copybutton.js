(function() {
  'use strict';

  if (!document.queryCommandSupported('copy')) {
    return;
  }

    function flashCopyMessage(el, msg, flashIcon, timeoutIcon) {
    el.textContent = msg;
    el.appendChild(flashIcon);
    setTimeout(function() {
      el.textContent = "";
      el.appendChild(timeoutIcon);
    }, 2000);
  }
  
  function selectText(node) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    return selection;
  }

  function addCopyButton(containerEl) {
    var copyBtn = document.createElement("button");
    copyBtn.className = "copy-code-button";
    //// FontAwesome Copy Icon
    //var copyIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //copyIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    //copyIcon.setAttribute("width", "24"); // Adjust the size as needed
    //copyIcon.setAttribute("height", "24");
    //copyIcon.setAttribute("viewBox", "0 0 448 512");

    //var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    //path.setAttribute("d", "M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"); // Copy icon path
    //path.setAttribute("fill", "var(--color-txt)"); // Circle color

    //copyIcon.appendChild(path)
    // Feather Copy Icon
    const copyIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    copyIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    copyIcon.setAttribute("width", "24");
    copyIcon.setAttribute("height", "24");
    copyIcon.setAttribute("viewBox", "0 0 24 24");
    copyIcon.setAttribute("fill", "none");
    copyIcon.setAttribute("stroke", "currentColor");
    copyIcon.setAttribute("stroke-width", "2");
    copyIcon.setAttribute("stroke-linecap", "round");
    copyIcon.setAttribute("stroke-linejoin", "round");
    copyIcon.classList.add("feather", "feather-copy");

    // Create a rectangle element for the copy icon
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "9");
    rect.setAttribute("y", "9");
    rect.setAttribute("width", "13");
    rect.setAttribute("height", "13");
    rect.setAttribute("rx", "2");
    rect.setAttribute("ry", "2");

    // Create a path for the copy icon
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1");

    // Append rectangle and path to the SVG
    copyIcon.appendChild(rect);
    copyIcon.appendChild(path);


    copyIcon.displayText = "Copy";
    //copyBtn.textContent = "Copy";

    var codeEl = containerEl.firstElementChild;
    copyBtn.addEventListener('click', function() {
      try {
        var selection = selectText(codeEl);
        document.execCommand('copy');
        selection.removeAllRanges();

        // Feather Check Icon
        const checkIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        checkIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        checkIcon.setAttribute("width", "24");
        checkIcon.setAttribute("height", "24");
        checkIcon.setAttribute("viewBox", "0 0 24 24");
        checkIcon.setAttribute("fill", "none");
        checkIcon.setAttribute("stroke", "currentColor");
        checkIcon.setAttribute("stroke-width", "2");
        checkIcon.setAttribute("stroke-linecap", "round");
        checkIcon.setAttribute("stroke-linejoin", "round");
        checkIcon.classList.add("feather", "feather-check");

        // Create polyline for the checkmark
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        polyline.setAttribute("points", "20 6 9 17 4 12");

        // Append polyline to the SVG
        checkIcon.appendChild(polyline);
        //flashCopyMessage(copyBtn, 'Copied!')
        flashCopyMessage(copyBtn, '', checkIcon, copyIcon) 
      } catch(e) {
        console && console.log(e);
        flashCopyMessage(copyBtn, 'Failed :\'(')
      }
    });
    copyBtn.appendChild(copyIcon);
    containerEl.appendChild(copyBtn);
  }

  // Add copy button to code blocks
  var highlightBlocks = document.getElementsByClassName('highlight');
  for (var i = 0; i < highlightBlocks.length; i++) {
    addCopyButton(highlightBlocks[i]);
  }
})();

//function addCopyButtonToCodeBlocks() {
//
//  // Function to determine if the background color is light or dark
//
//  function isColorDark(color) {
//
//    const rgb = color.match(/\d+/g);
//
//    const r = parseInt(rgb[0], 10);
//
//    const g = parseInt(rgb[1], 10);
//
//    const b = parseInt(rgb[2], 10);
//
//    // Calculate luminance
//
//    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
//
//    return luminance < 0.5;
//
//  }
//
//
//  // Function to adjust color brightness significantly
//
//  function adjustColorBrightness(color, amount) {
//
//    const rgb = color.match(/\d+/g);
//
//    const r = Math.min(255, Math.max(0, parseInt(rgb[0], 10) + amount));
//
//    const g = Math.min(255, Math.max(0, parseInt(rgb[1], 10) + amount));
//
//    const b = Math.min(255, Math.max(0, parseInt(rgb[2], 10) + amount));
//
//    return `rgb(${r}, ${g}, ${b})`;
//
//  }
//
//
//  // Get all code blocks with a class of "language-*"
//
//  const codeBlocks = document.querySelectorAll(
//
//    'pre > code[class^="language-"]'
//
//  );
//
//  const copyIcon = '<i class="fas fa-copy"></i> copy code';
//
//  const copiedIcon = '<i class="fas fa-check"></i> copied!';
//
//
//  // For each code block, add a copy button inside a header
//
//  codeBlocks.forEach((codeBlock) => {
//
//    // Get the background color of the code block
//
//    const computedStyle = window.getComputedStyle(codeBlock);
//
//    const backgroundColor = computedStyle.backgroundColor;
//
//
//    // Adjust the header color to be significantly lighter or darker than the background color
//
//    const headerColor = isColorDark(backgroundColor)
//
//      ? adjustColorBrightness(backgroundColor, 65)
//
//      : adjustColorBrightness(backgroundColor, -65);
//
//    const textColor = isColorDark(backgroundColor) ? "#d1d1d1" : "#606060";
//
//
//    // Create the header div
//
//    const header = document.createElement("div");
//
//    header.style.backgroundColor = headerColor;
//
//    header.style.display = "flex";
//
//    header.style.justifyContent = "space-between";
//
//    header.style.alignItems = "center";
//
//    header.style.paddingRight = "0.5rem";
//
//    header.style.paddingLeft = "0.5rem";
//
//    header.style.borderTopLeftRadius = "5px";
//
//    header.style.borderTopRightRadius = "5px";
//
//    header.style.color = textColor;
//
//    header.style.borderBottom = `1px solid ${headerColor}`;
//
//    header.classList.add("small");
//
//
//    // Create the copy button
//
//    const copyButton = document.createElement("button");
//
//    copyButton.classList.add("btn", "copy-code-button");
//
//    copyButton.style.background = "none";
//
//    copyButton.style.border = "none";
//
//    copyButton.style.color = textColor;
//
//    copyButton.style.fontSize = "100%"; // Override the font size
//
//    copyButton.style.cursor = "pointer";
//
//    copyButton.innerHTML = copyIcon;
//
//    copyButton.style.marginLeft = "auto";
//
//
//    // Add a click event listener to the copy button
//
//    copyButton.addEventListener("click", () => {
//
//      // Copy the code inside the code block to the clipboard
//
//      const codeToCopy = codeBlock.innerText;
//
//      navigator.clipboard.writeText(codeToCopy);
//
//
//      // Update the copy button text to indicate that the code has been copied
//
//      copyButton.innerHTML = copiedIcon;
//
//      setTimeout(() => {
//
//        copyButton.innerHTML = copyIcon;
//
//      }, 1500);
//
//    });
//
//
//    // Get the language from the class
//
//    const classList = Array.from(codeBlock.classList);
//
//    const languageClass = classList.find((cls) => cls.startsWith("language-"));
//
//    const language = languageClass
//
//      ? languageClass.replace("language-", "")
//
//      : "";
//
//
//    // Create the language label
//
//    const languageLabel = document.createElement("span");
//
//    languageLabel.textContent = language ? language.toLowerCase() : "";
//
//    languageLabel.style.marginRight = "10px";
//
//
//    // Append the language label and copy button to the header
//
//    header.appendChild(languageLabel);
//
//    header.appendChild(copyButton);
//
//
//    // Find the parent element with the "highlight" class and insert the header before it
//
//    const highlightParent = codeBlock.closest(".highlight");
//
//    if (highlightParent) {
//
//      highlightParent.insertBefore(header, highlightParent.firstChild);
//
//    }
//
//  });
//
//}
//
//
//// Call the function to add copy buttons to code blocks
//
//document.addEventListener("DOMContentLoaded", addCopyButtonToCodeBlocks);
