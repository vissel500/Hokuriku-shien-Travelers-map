document.addEventListener("turbo:load", () => {
  document.querySelectorAll(".bookmark-button").forEach(button => {
    button.addEventListener("click", function() {
      const spotId = this.getAttribute("data-spot-id");
      const bookmarked = this.getAttribute("data-bookmarked") === "true";
      const bookmarkId = this.getAttribute("data-bookmark-id");
      const method = bookmarked ? "DELETE" : "POST";
      const url = bookmarked ? `/bookmarks/${bookmarkId}` : "/bookmarks";

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
        },
        body: method === "POST" ? JSON.stringify({ tourist_spot_id: spotId }) : null
      }).then(response => response.json())
        .then(data => {
          if (data.error) {
            alert('操作に失敗しました: ' + data.error);
          } else {
            location.reload();
          }
        }).catch(error => {
          console.error("Error:", error);
          alert("操作に失敗しました。");
        });
    });
  });
});  