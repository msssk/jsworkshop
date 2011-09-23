$(function() {

var scopeDefinitions = {
	"example1-code": {
		page: '1',
		inner: [4, 8],
		outer: [1, 10]
	},

	"example2-code": {
		page: '2',
		inner: [14, 18],
		outer: [1, 20]
	}
};

$.each( scopeDefinitions, function( index, scopeDef ) {
	$( '#example' + scopeDef.page + '-code' ).bind( 'SyntaxHighlighted', highlightScope );
});

$( '#setFunctionScope' ).click( toggleScope );
$( '#setBlockScope' ).click( toggleScope );

SyntaxHighlighter.all();

/* ********** */

function getLineSelector( lineNumberList ) {
	return lineNumberList.map( function( num ) { return '.number' + num; } ).join( ', ' );
}

function highlightScope( shEvent ) {
	var sd = scopeDefinitions[shEvent.target.id];
	var container = $( '#page' + sd.page );
	var innerIndexes = _.range( sd.inner[0], sd.inner[1] );
	var outerIndexes = _.difference( _.range( sd.outer[0], sd.outer[1] ), innerIndexes );
	var globalRows = container.find( getLineSelector( outerIndexes ) );
	var innerRows = container.find( getLineSelector( innerIndexes ) );

	globalRows.bind( 'mouseenter mouseleave', {rows: innerRows}, toggleOOS );
}

function toggleOOS( mouseEvent ) {
	mouseEvent.data.rows.toggleClass( 'oos' );
}

function toggleScope( mouseEvent ) {
	if( mouseEvent.target.id === 'setBlockScope' ) {
		$( '#setFunctionScope' ).removeClass( 'selected' );
		$(mouseEvent.target).addClass( 'selected' );
		setBlockScope();
	}
	else {
		$( '#setBlockScope' ).removeClass( 'selected' );
		$(mouseEvent.target).addClass( 'selected' );
		setFunctionScope();
	}
}

function setBlockScope() {
	var container = $( '#page2' );
	var block1Indexes = _.range( 4, 7 );
	var block2Indexes = _.range( 9, 12 );
	var block3Indexes = _.range( 14, 18 );
	var globalIndexes = _.difference( _.difference( _.difference( _.range( 1, 20 ), block1Indexes ), block2Indexes ), block3Indexes );
	var globalRows = container.find( getLineSelector( globalIndexes ) );
	var block1Rows = container.find( getLineSelector( block1Indexes ) );
	var block2Rows = container.find( getLineSelector( block2Indexes ) );
	var block3Rows = container.find( getLineSelector( block3Indexes ) );

	globalRows.unbind( 'mouseenter mouseleave', toggleOOS );
	globalRows.bind( 'mouseenter mouseleave', {rows: block1Rows.add( block2Rows ).add( block3Rows )}, toggleOOS );

	block1Rows.unbind( 'mouseenter mouseleave', toggleOOS );
	block2Rows.unbind( 'mouseenter mouseleave', toggleOOS );
	block3Rows.unbind( 'mouseenter mouseleave', toggleOOS );

	block1Rows.bind( 'mouseenter mouseleave', {rows: block2Rows.add( block3Rows )}, toggleOOS );
	block2Rows.bind( 'mouseenter mouseleave', {rows: block1Rows.add( block3Rows )}, toggleOOS );
	block3Rows.bind( 'mouseenter mouseleave', {rows: block1Rows.add( block2Rows )}, toggleOOS );
}

function setFunctionScope() {
	$( '#page2' ).find( '.line' ).unbind( 'mouseenter mouseleave', toggleOOS );
	highlightScope( {target: {id: 'example2-code'}} );
}

});