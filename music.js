var myAudio = $("audio")[0] //get html document
var lyricArr = []

$(".btn1").click(function () {
    if (myAudio.paused) {
        play()
    } else {
        pause()
    }
})

$(".btn2").click(function () {
    getChannel()

})
$(".btn3").click(function () {
    getMusic();
})

function play() {
    myAudio.play()
    $('.btn1').removeClass("m-play").addClass("m-pause")
}

function pause() {
    myAudio.pause()
    $('btn1').removeClass("m-pause").addClass('m-play');
}


function getChannel() {
    $.ajax({
            url: "http://api.jirengu.com/fm/getChannels.php",
            dataType: 'json',
            Method: 'get',
            success: function (response) {
                var channels = response.channels
                var num = Math.floor(Math.random() * channels.length)
                var channelName = channels[num].name
                var channelId = channels[num].channel_id
                console.log(channelName)
                console.log(channelId)
                $('.record').text(channelName)
                $('.record').attr('title', channelName)
                $('.record').attr('data-id', channelId)
                getMusic()
            }
        }
    )
}

function getMusic() {
    $.ajax({
        url: 'http://api.jirengu.com/fm/getSong.php',
        dataType: 'json',
        Method: 'get',
        data: {
            'channel': $('.record').attr('data-id')
        },
        success: function (ret) {
            var resource = ret.song[0]
            var url = resource.url
            var bgPic = resource.picture
            var sid = resource.sid
            var ssid = resource.ssid
            var title = resource.title
            var author = resource.artist
            $('audio').attr('src', url)
            console.log(url)
            $('audio').attr('sid', sid)
            $('audio').attr('ssid', ssid)
            console.log(ssid)
            $('.musicname').text(title)
            $('.musicname').attr("title", title)
            $('.musisian').text(author)
            $('.musisian').attr('title',author)
            $(".background").css({
                'background':'url('+bgPic+')',
                'background-repeat': 'no-repeat',
                'background-position': 'center',
                'background-size': 'cover',
            });

            play()
            // play()
            // getlyric()
            }
    })

}

$(document).ready(getChannel())