function execute(url) {
    // Trích xuất ID chương từ URL
    let chapterId = url.split('-').pop();
    let apiUrl = `https://mimihentai.com/api/v1/manga/chapter?id=${chapterId}`;

    let response = fetch(apiUrl);
    if (!response.ok) return Response.error("Lỗi kết nối API");

    let json = response.json();

    // Trả về mảng các URL ảnh
    return Response.success(json.pages);
}