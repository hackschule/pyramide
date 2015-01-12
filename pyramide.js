/* 
 Auflösung: 672 x 384 Pixel
 Felder:    28 x 16 (jeweils 24 x 24 Pixel groß)
 
 Funktionen:
 -----------
 load_sprites(dateiname)   - lädt die Sprites aus einer Datei
 clear(html_farbe)         - löscht das Bild mit einer Farbe, z. B. #000000 (schwarz)
 draw_sprite(x, y, nummer) - zeichnet ein Sprite
 set_field(x, y, wert)     - setzt ein Feld auf einen Wert
 get_field(x, y)           - gibt Wert für ein Feld zurück
*/

function init()
{
    init_game(672, 384);
    load_sprites('images/test_sprites.png');
}

function loop(time)
{
    clear('#000020');
}