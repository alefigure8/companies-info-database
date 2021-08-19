/*=====Copy Info Mail =====*/

var btnCopy = document.querySelector('#btnCopy');

if (btnCopy) {
    btnCopy.addEventListener('click', function(event) {
        var copyTextarea = document.querySelector('#copyTextarea');
        copyTextarea.focus();
        copyTextarea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }

    });
}



/*===== submit=====*/

/*
const btnName = document.getElementById("btn-item-1")
btnName.addEventListener('click', () => {
    document.getElementById("form-item-1").submit();

});
*/