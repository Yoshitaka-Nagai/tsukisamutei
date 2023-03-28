$(function () {
  // -----jQueryの記述---------------------------

  //ブラウザのビューポートの高さ
  const windowHeight = $(window).innerHeight();

  //ハンバーガーメニュー開閉
  $('#hamburger-icon').on('click', function () {
    $(this).toggleClass('is-active');
    $('#slide-menu').toggleClass('is-active');
  });

  //スライドメニューのリンクhover(mouseenter)処理
  $('.slide-menu__link').on('mouseenter', function () {
    //既に設定されている背景用のクラスを削除
    $('#slide-menu__bg').removeClass(function (index, className) {
      //クラス名がbg-…のクラスを削除するための処理
      return (className.match(/\bbg-\S+/g) || []).join(' ');
    });

    //背景用のクラスを設定
    $('#slide-menu__bg').addClass('bg-' + $(this).attr('data-bg'));

    //hover状態のクラス設定
    $('.slide-menu__link').each(function () {
      $(this).addClass('not-active');
    });
    $(this).removeClass('not-active');
  });

  //スライドメニューのリンクhover(mouseleave)処理
  $('.slide-menu__link').on('mouseleave', function () {
    $('.slide-menu__link').each(function () {
      $(this).removeClass('not-active');
    });
  });

  //ページ内リンクナビゲーション表示処理
  const messageAreaPos = $('#message').offset().top;
  function showSectionNav() {
    if ($(window).scrollTop() >= messageAreaPos) {
      $('#section-nav').addClass('is-active');
    } else {
      $('#section-nav').removeClass('is-active');
    }
  }

  //ページ内リンクナビゲーションis-activeクラス付与処理
  function activeSectionNavLink() {
    const st = $(window).scrollTop();
    $('.section').each(function () {
      const targetPos = $(this).offset().top;
      const targetHeight = $(this).outerHeight(true);
      if (targetPos - windowHeight * 0.5 <= st && st <= targetPos + targetHeight - windowHeight * 0.5) {
        const sectionId = '#' + $(this).attr('id');
        $('.section-nav__link').each(function () {
          const href = $(this).attr('href');
          if (href === sectionId) {
            $(this).addClass('is-active');
          } else {
            $(this).removeClass('is-active');
          }
        });
        return false;
      } else {
        $('.section-nav__link').each(function () {
          $(this).removeClass('is-active');
        });
      }
    });
  }

  //スムーススクロール処理
  $('.section-nav__link').on('click', function () {
    const target = $(this).attr('href');
    const targetPos = $(target).offset().top;
    $('html, body').animate({ scrollTop: targetPos }, 500);
    return false;
  });

  //リサイズヘッダー処理
  function changeHeader() {
    const st = $(window).scrollTop();
    let changed = false;
    $('.changeHeader').each(function () {
      const targetPos = $(this).offset().top;
      const targetHeight = $(this).outerHeight(true);
      if (targetPos - windowHeight * 0.5 <= st && st <= targetPos + targetHeight - windowHeight * 0.5) {
        $('#header__logo').addClass('black');
        $('#gnav').addClass('black');
        $('#hamburger-icon').addClass('black');
        changed = true;
      }
    });
    if (!changed) {
      $('#header__logo').removeClass('black');
      $('#gnav').removeClass('black');
      $('#hamburger-icon').removeClass('black');
    }
  }

  //ビューワー処理
  $('.gallery__tmb-link').on('click', function () {
    const path = $(this).attr('href');
    $('#gallery__img').attr('src', path);
    return false;
  });

  //topへ戻るボタン
  $('#footer__back-link').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
    return false;
  });

  //fadeクラス付与
  function setFadeClass() {
    const st = $(window).scrollTop();
    $('.fade').each(function () {
      const target = $(this).offset().top;
      if (st > target - windowHeight * 0.4) {
        $(this).addClass('showElement');
      }
    });
  }

  //ページ読み込み時に一度実行
  showSectionNav();
  changeHeader();
  activeSectionNavLink();

  //スクロール時のイベント設定
  $(window).on('scroll', function () {
    showSectionNav();
    changeHeader();
    activeSectionNavLink();
    setFadeClass();
  });

  // -----ここまで-------------------------------
});