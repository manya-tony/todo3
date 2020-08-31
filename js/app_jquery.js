// =======================================
// TODO内容をリストに追加する
// =======================================
$('.js-add-todo').on('click', function(e){
    // フォームのsubmitイベントをなしに
    e.preventDefault();

    var $getVal = $('.js-get-val'),
        text = $getVal.val();
    // テキストの中身を空にする
    $getVal.val('');

    // もしtextが空のまま追加ボタンが押されていたらエラーテキストを出す
    if(!text) {
        $('.js-toggle-error').show();
        return;
    }
    // エラーを隠す
    $('.js-toggle-error').hide();

    $('.js-todo_list').prepend(
        '<li class="list__item js-todo_list-item" data-text="' + text + '">'+
            '<i class="fa fa-square-o icon-check js-click-done" aria-hidden="true"></i>'+
            '<span class="js-todo_list-text">' + text + '</span>'+
            '<input type="text" class="editText js-todo_list-editForm" value="' + text + '">'+
            '<i class="fa fa-trash icon-trash js-click-trash" aria-hidden="true"></i>'+
        '</li>'
    );

});

// =======================================
// 達成・未達成を切り替える
// =======================================
$(document).on('click', '.js-click-done', function(){
    $(this).removeClass('fa-square-o').addClass('fa-check-square').removeClass('js-click-done').addClass('js-click-todo').parent().addClass('list__item--done');
});

$(document).on('click', '.js-click-todo', function(){
    $(this).removeClass('fa-check-square').addClass('fa-square-o').removeClass('js-click-todo').addClass('js-click-done').parent().removeClass('list__item--done');
});


// =======================================
// TODOタスクを削除する
// =======================================
$(document).on('click', '.js-click-trash', function(){
    $(this).parent().fadeOut(500, function(){
        $this.remove();
    });
});


// =======================================
// TODOタスクを書き換える
// =======================================
$(document).on('click', '.js-todo_list-text', function(){
  $(this).hide().siblings('.js-todo_list-editForm').show();
});

$(document).on('keyup', '.js-todo_list-editForm', function(e){
  if(e.keyCode === 13 && e.shiftKey === true) {
    var $this = $(this),
        changeText = $this.val();
    $this.hide().siblings('.js-todo_list-text').text(changeText).show().parent().attr('data-text', changeText);
  }
});


// =======================================
// 検索
// =======================================
$('.js-search').on('keyup', function(){

  var searchText = $(this).val();

  $('.js-todo_list-item').show().each(function(i, elm){
    var text = $(elm).data('text');
    if(text && text.match(new RegExp('^' + searchText))){
      return true;
    } else {
      $(elm).hide();
    }
  });


});
