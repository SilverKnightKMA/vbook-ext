load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        htm = doc.select("div#chapter-content");
        htm.select("p.none").remove();
        htm.select('img[src*="/images/banners/"]').remove();
        htm.select('img[src*="/lightnovel/banners/"]').remove();
        htm.select("p:contains(Tham gia Hako Discord tại)").remove();
        htm.select("p:contains(Theo dõi Fanpage Hako tại)").remove();
        htm = htm.html().replace(/<p id=\"\d+\">/g, "<p>");
        htm = htm.replace(/\&nbsp;/g, "");
        let collection = doc.select("div.note-reg a.none-print")
        collection.forEach((element) => {
            let note = element.attr("href").replace("#anchor-","")
            let note_content  = doc.select("#" + note +" span.note-content").text()
            htm = htm.replace("["+note+"]"," <i>(📝 "+note_content+")<\/i>")
        });
        return Response.success(htm);
    }
    return null;
}