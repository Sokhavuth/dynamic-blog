// static/scripts/video.js

let episode = 0

const genJson = () => {
    let json = $('input[name="videos"]').val()
    if((json !== '')&&(json !== '[]')){
        json = JSON.parse(json)
        episode = json.length
    }else{
        episode = 0
    }

    const type = $('select[name="type"').val()
    const id = $('input[name="videoid"').val()
    const status = $('select[name="status"').val()
            
    let video = {
        type: type,
        id: id,
        status: status,
    }
        
    let success = false
    
    for(let v in video){
        if(video[v] === ''){
            alert('You need to fill the required field '+v)
            success = false
            break
        }else{
            success = true
        }
    }

    if(success){
        let json = $('input[name="videos"]').val()
        video = {
            type: type,
            id: id,
            status: status,
        }
        if((json === '')){
            json = JSON.stringify([video])
            $('input[name="videos"]').val(json)
        }else{
            json = JSON.parse(json)
            json.push(video)
            json = JSON.stringify(json)
            $('input[name="videos"').val(json)
        }

        let html =``

        for(let v in video){
            html += `<input class="border px-2 py-1 border-slate-300 text-center" 
            value="${video[v]}" required />`
        }

        html += `<p title="លុប" onClick="deleteRow(event)"
        class="episode border px-2 py-1 border-slate-300 hover:opacity-75 text-center bg-slate-200 hover:cursor-pointer">
        ${++episode}
        </p>`
        html = `<div class="grid md:grid-cols-[20%_auto_25%_15%] grid-cols-1">${html}</div>`
        
        $('.viddata div:eq(0)' ).after(html)
    }
}

function submitForm(){
    
    const is_video = $('input[name="videos"').val()

    if((is_video !== '') && (is_video !== '[]')){
        episode = JSON.parse(is_video).length
        let videos = []
        let part = {}
        let key = {0:'type', 1:'id', 2:'status'}

        for(let v=1; v<=episode; v++){
            for(let j=0; j<3; j++){
                part[key[j]] = $(`.viddata div:eq(${v}) input:eq(${j})`).val()
            }

            videos.push({...part})
        }

        const json = JSON.stringify(videos)
        $('input[name="videos"').val(json)
        alert(json)
    }
}

function deleteRow(e) {
    e.target.parentElement.remove()
    
    let index = parseInt(e.target.innerHTML)
    index = index - 1
    let json = $('input[name="videos"]').val()
    json = JSON.parse(json)
    json.splice(index, 1)
    episode = json.length
    json = JSON.stringify(json)
    $('input[name="videos"').val(json)

    for(let v=episode; v>-1; v--){
        $('.episode').eq(v).html(episode-v)
    }
}