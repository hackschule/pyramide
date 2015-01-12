// fields: 28x16

var vars = {
    game_width: null,
    game_height: null,
    game_supersampling: null,
    canvas: null,
    imageContext: null,
    fields: []
};

function set_field(x, y, value)
{
    if (x < 0 || x >= 28 || y < 0 || y >= 16)
        return;
    vars.fields[y][x] = value;
}

function get_field(x, y)
{
    if (x < 0 || x >= 28 || y < 0 || y >= 16)
        return -1;
    return vars.fields[y][x];
}

function fix_sizes()
{
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvas = $('#canvas');
    if (width * vars.game_height < height * vars.game_width)
    {
        height = width * vars.game_height / vars.game_width;
        canvas.css('left', 0);
        canvas.css('top', (window.innerHeight - height) / 2);
    }
    else
    {
        width = height * vars.game_width / vars.game_height;
        canvas.css('left', (window.innerWidth - width) / 2);
        canvas.css('top', 0);
    }
    canvas.css('width', width);
    canvas.css('height', height);
}

$().ready(function() {
    vars.fields = [];
    for (var y = 0; y < 16; y++)
    {
        var temp = [];
        for (var x = 0; x < 28; x++)
            temp.push(-1);
        vars.fields.push(temp);
    }

    init();

    vars.canvas = document.getElementById("canvas");
    vars.imageContext = vars.canvas.getContext("2d");
    vars.imageContext.mozImageSmoothingEnabled = false;
    vars.imageContext.webkitImageSmoothingEnabled = false;
    vars.imageContext.msImageSmoothingEnabled = false;
    vars.imageContext.imageSmoothingEnabled = false;

    window.onresize = fix_sizes;
    fix_sizes();

    window.key_down = {};

    function _loop(time)
    {
        loop(time / 1000.0);
        requestAnimationFrame(_loop);
    }

    function _game_logic_loop()
    {
        game_logic_loop();
        window.key_down = {};
        setTimeout(_game_logic_loop, 66);
    }

    function _keydown(e)
    {
        keydown(e.keyCode);
    }

    window.addEventListener("keydown", _keydown, false);
    requestAnimationFrame(_loop);
    setTimeout(_game_logic_loop, 66);
});

function init_game(width, height, supersampling)
{
    if (typeof(supersampling) == 'undefined')
        supersampling = 4;
    vars.game_width = width;
    vars.game_height = height;
    vars.game_supersampling = supersampling;
    var canvas = $('<canvas>');
    canvas.attr('id', 'canvas');
    canvas.attr('width', width * supersampling);
    canvas.attr('height', height * supersampling);
    canvas.css('position', 'absolute');
    canvas.css('left', 0);
    canvas.css('top', 0);
    $('body').append(canvas);
}

function load_sprites(path, id)
{
    if (typeof(id) === 'undefined')
        id = 'sprites_default';
    var img = $('<img>').attr('id', id).attr('src', path).css('display', 'none');
    $('body').append(img);
}

function fill_rect(x0, y0, x1, y1, color)
{
    vars.imageContext.fillStyle = color;
    vars.imageContext.strokeStyle = "none";
    vars.imageContext.fillRect(x0 + 0.5, y0 + 0.5, x1 - x0 + 1, y1 - y0 + 1);
}

function clear(color)
{
    fill_rect(0, 0, vars.game_width * vars.game_supersampling, vars.game_height * vars.game_supersampling, color);
}

function fill_rect_semi(x0, y0, x1, y1)
{
    vars.imageContext.fillStyle = 'rgba(0, 0, 0, 0.4)'
    vars.imageContext.strokeStyle = "none";
    vars.imageContext.fillRect(x0 + 0.5, y0 + 0.5, x1 - x0 + 1, y1 - y0 + 1);
}

function draw_rect(x0, y0, x1, y1, color)
{
    vars.imageContext.strokeStyle = window.defaultHtml[color % 16];
    vars.imageContext.fillStyle = "none";
    vars.imageContext.strokeWidth = 1.0;
    vars.imageContext.strokeRect(x0 + 0.5, y0 + 0.5, x1 - x0 + 1, y1 - y0 + 1);
}

function draw_sprite(x, y, which, id)
{
    if (typeof(id) === 'undefined')
        id = 'sprites_default';
    if (which < 0)
        return;
    x = Math.round(x);
    y = Math.round(y);
    var px = Math.floor(which % 8);
    var py = Math.floor(which / 8);
    vars.imageContext.drawImage(document.getElementById(id), px * 24, py * 24, 24, 24, 
                                x * vars.game_supersampling, y * vars.game_supersampling, 
                                24 * vars.game_supersampling, 24 * vars.game_supersampling);
}

function draw_part(which, x, y, sx, sy, sw, sh, alpha)
{
    vars.imageContext.save();
    vars.imageContext.globalAlpha = alpha;
    x = Math.round(x);
    y = Math.round(y);
    vars.imageContext.drawImage(document.getElementById(which), sx, sy, sw, sh, 
                                x * vars.game_supersampling, y * vars.game_supersampling,
                                sw * vars.game_supersampling, sh * vars.game_supersampling);
    vars.imageContext.restore();
}

function draw_image(which, x, y)
{
    x = Math.round(x);
    y = Math.round(y);
    var img = $('#' + which);
    vars.imageContext.drawImage(document.getElementById(which), 0, 0, img.width(), img.height(), 
                                  x * vars.game_supersampling, y * vars.game_supersampling, 
                                  img.width() * vars.game_supersampling, img.height() * vars.game_supersampling);
}
