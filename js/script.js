$(function() {
    //设置canvas的宽度
    var w = $('.canvas').width();
    var can = $('#can')[0];
    can.width = w;
    var deg = Math.PI / 180;
    var ctx = can.getContext('2d');
    //移动画布原点 移动到画布中心点
    ctx.translate(w / 2, 150);
    //请求数据
    $.ajax({
        url: "data/data.json",
        success: function(d) {
            //画扇形图
            var start = 0;
            var str = "";
            $.each(d.data, function(i, v) {
                //每一扇形的角度
                var radius = v.bili / 100 * 360 + start;
                //start结束角度
                //v.bili / 100 * 360 / 2 每一扇形角度的一半
                var x = Math.cos((v.bili / 100 * 360 / 2 + start - 90) * deg) * 80; // x
                var y = Math.sin((v.bili / 100 * 360 / 2 + start - 90) * deg) * 80; //y
                //开始画扇形
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, 80, (start - 90) * deg, (radius - 90) * deg, false);
                ctx.fillStyle = v.color;
                ctx.fill();
                if (i < 5) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    if (x > 0 && y < 0) {
                        ctx.lineTo(x + 10, y - 10);
                        ctx.lineTo(x + 100, y - 10);
                    } else if (x < 0 && y > 0) {
                        ctx.lineTo(x, y + 10);
                        ctx.lineTo(x + 100, y - 10);
                    } else if (x < 0 && y < 0) {
                        if (y < x) {
                            ctx.lineTo(x - 10, y - 10);
                            ctx.lineTo(x - 100, y - 10);
                        } else {
                            ctx.lineTo(x - 10, y + 10);
                            ctx.lineTo(x - 100, y - 10);
                        }
                    }
                    ctx.stroke();
                }
                start = radius;

                str += '<tr>';
                $.each(v, function(i, a) {
                    str += '<td>' + a + '</td>';
                });
                str += '</tr>'

            });
            $('tbody').html(str);
        }
    })

})