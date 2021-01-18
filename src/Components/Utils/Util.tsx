// let testurl = "https://www.youtube.com/watch?v=_3_sehZ0-ZA";

export const get_youtube_thumbnail = (url: string) => {
    if(url){
        let video_id, result;
        if(result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))
        {
            video_id = result.pop();
        }
        else if(result = url.match(/youtu.be\/(.{11})/))
        {
            video_id = result.pop();
        }
        let thumbnail = "http://img.youtube.com/vi/"+video_id+"/"+"mqdefault"+".jpg"
        console.log(thumbnail);
        return thumbnail
    }
}
    
