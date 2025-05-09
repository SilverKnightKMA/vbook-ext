let BASE_URL = 'https://docln.sbs';
try {
    if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
}

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let collection = doc.select("div.note-reg a.none-print");
        htm = doc.select("div#chapter-content");
        htm.select('a[href*="/truyen/"]').remove();
        htm.select("p.none").remove();
        htm.select('img[src*="/images/banners/"]').remove();
        htm.select('img[src*="/lightnovel/banners/"]').remove();
        htm.select("p:contains(Tham gia Hako Discord tại)").remove();
        htm.select("p:contains(Theo dõi Fanpage Hako tại)").remove();
        //htm.select("div.note-reg").remove();
        htm = htm.html().replace(/<p id=\"\d+\">/g, "<p>");
        htm = htm.replace(/\&nbsp;/g, "");
        collection.forEach((element) => {
            let note = element.attr("href").replace("#anchor-","");
            let note_content  = doc.select("#" + note +" span.note-content").text();
            htm = htm.replace("["+note+"]"," <i>(📝 "+note_content+")<\/i>");
        });
        return Response.success(htm);
    }
    return null;
}