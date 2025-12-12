var buf = new Buffer('curBuff');

function bang() {
    var frames = buf.framecount();
    var chans  = buf.channelcount();
    for (var c = 0; c < chans; c++) {
        var data = [];
        for (var i = 0; i < frames; i++) {
            data.push(buf.peek(c + 1, i));
        }
        outlet(0, "buffer", c, data);
    }
}