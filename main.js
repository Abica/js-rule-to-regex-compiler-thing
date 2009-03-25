var patterns = [ "AAAA",
                 "AAA_#####",
                 "AAA_#######_##",
                 "A####_@@",
                 "??_AAA#A_#",
                 "@@@@_####_????" ];

function add_count( container, count ) {
    container.push( "{" + count + "," + count + "}" );
}

function create_pattern( p ) {
    var pattern = [];
    var next_char = null;
    var count = 1;
    var chunk = null;
    var tokens = p.split( "" );
    var char_map = { "A": "[a-z]",
                     "#": "[0-9]",
                     "?": ".",
                     "@": "[a-z0-9]",
                     "_": "[\\s_-]" };
    $.each( tokens, function( index, character ) {
        next_char = tokens[ index + 1 ];
        if ( next_char == character ) count++;

        if ( ( next_char != character ) && (  chunk = char_map[ character ] ) ) {
            pattern.push( chunk );
        }

        last_char = character;
        if ( ( count > 1 ) && ( next_char != character ) ) {
            add_count( pattern, count );
            count = 1;
        }
    } );
    return new RegExp( pattern.join( "" ), "gi" );
}

$.each( patterns, function( index, item ) {
    var pattern = create_pattern( item );
    console.log( item + " -> " + pattern.toSource() );
} );
