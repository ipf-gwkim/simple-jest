const Book = function (title, currentPage) {
  this.title = title; 
  this.currentPage = currentPage;
};

Book.prototype.next = function () {
  this.currentPage++;
}