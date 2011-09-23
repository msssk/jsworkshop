$( function() {

var Navigator = (function() {
	var currentIndex = 1;
	var backButton = $( '#backButton' );
	var nextButton = $( '#nextButton' );

	function next() {
		var currentP;
		var nextP = $( '#page' + (currentIndex + 1) );

		if( nextP.length ) {
			if( currentIndex === 1 ) {
				backButton.removeClass( 'disabled' );
			}

			currentP = $( '#page' + currentIndex );
			currentP.hide();
			nextP.show();
			currentIndex++;

			nextP = $( '#page' + (currentIndex + 1) );
			if( !nextP.length ) {
				nextButton.addClass( 'disabled' );
			}
		}
	}

	function back() {
		if( currentIndex === 1 ) {
			return;
		}

		var currentP = $( '#page' + currentIndex );
		var prevP = $( '#page' + (currentIndex - 1) );

		currentP.hide();
		prevP.show();
		nextButton.removeClass( 'disabled' );
		currentIndex--;

		if( currentIndex === 1 ) {
			backButton.addClass( 'disabled' );
		}
	}

	return {
		next: next,
		back: back
	};
}());

$( '#page1' ).show();
$( '#backButton' ).click( Navigator.back );
$( '#nextButton' ).click( Navigator.next );

});