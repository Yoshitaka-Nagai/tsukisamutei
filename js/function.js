//JavaScript
document.addEventListener('DOMContentLoaded', function () {
  //ブラウザのビューポートの高さ
  const windowHeight = window.innerHeight;

  //ハンバーガーメニュー開閉
  document.getElementById('hamburger-icon').addEventListener('click', function () {
    this.classList.toggle('is-active');
    document.getElementById('slide-menu').classList.toggle('is-active');
  })


  document.querySelectorAll('.slide-menu__link').forEach(function (link) {
    //スライドメニューのリンクhover(mouseenter)処理
    link.addEventListener('mouseenter', function () {
      //既に設定されている背景用のクラスを削除
      const bg = document.getElementById('slide-menu__bg');
      const bgClassList = bg.className;
      const myRegExp = new RegExp(/\bbg-\S+/, 'g');
      const myMatched = bgClassList.match(myRegExp) || [];
      for (let i = 0; i < myMatched.length; i++) {
        bg.classList.remove(myMatched[i]);
      }

      //背景用のクラスを設定
      bg.classList.add('bg-' + this.getAttribute('data-bg'));

      //hover状態のクラス設定
      document.querySelectorAll('.slide-menu__link').forEach(e => e.classList.add('not-active'));
      this.classList.remove('not-active');
    });

    //スライドメニューのリンクhover(mouseleave)処理
    link.addEventListener('mouseleave', function () {
      document.querySelectorAll('.slide-menu__link').forEach(e => e.classList.remove('not-active'));
    });
  });

  //ページ内リンクナビゲーション表示処理
  const messageAreaPos = document.getElementById('message').getBoundingClientRect().top + window.scrollY;
  function showSectionNav() {
    if (window.scrollY >= messageAreaPos) {
      document.getElementById('section-nav').classList.add('is-active');
    } else {
      document.getElementById('section-nav').classList.remove('is-active');
    }
  }

  //ページ内リンクナビゲーションis-activeクラス付与処理
  function activeSectionNavLink() {
    const st = window.scrollY;
    const sectionList = document.querySelectorAll('.section');
    for (let i = 0; i < sectionList.length; i++) {
      const e = sectionList[i];
      const styles = window.getComputedStyle(e);
      const targetPos = e.getBoundingClientRect().top + window.scrollY;
      const targetHeight = e.offsetHeight + parseInt(styles['margin-bottom']);
      if (targetPos - windowHeight * 0.5 <= st && st <= targetPos + targetHeight - windowHeight * 0.5) {
        const sectionId = '#' + e.getAttribute('id');
        document.querySelectorAll('.section-nav__link').forEach(link => {
          const href = link.getAttribute('href');
          if (href === sectionId) {
            link.classList.add('is-active');
          } else {
            link.classList.remove('is-active');
          }
        });
        break;
      } else {
        document.querySelectorAll('.section-nav__link').forEach(link => {
          link.classList.remove('is-active');
        });
      }
    }
  }

  //スムーススクロール処理
  document.querySelectorAll('.section-nav__link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href').replace('#', '');
      const targetPos = document.getElementById(target).getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: targetPos,
        behavior: 'smooth',
      });
    });
  });

  //リサイズヘッダー処理
  function changeHeader() {
    const st = window.scrollY;
    let changed = false;
    document.querySelectorAll('.changeHeader').forEach(e => {
      const styles = window.getComputedStyle(e);
      const targetPos = e.getBoundingClientRect().top + window.scrollY;
      const targetHeight = e.offsetHeight + parseInt(styles['margin-bottom']);
      if (targetPos - windowHeight * 0.5 <= st && st <= targetPos + targetHeight - windowHeight * 0.5) {
        document.getElementById('header__logo').classList.add('black');
        document.getElementById('gnav').classList.add('black');
        document.getElementById('hamburger-icon').classList.add('black');
        changed = true;
      }
    });
    if (!changed) {
      document.getElementById('header__logo').classList.remove('black');
      document.getElementById('gnav').classList.remove('black');
      document.getElementById('hamburger-icon').classList.remove('black');
    }
  }

  //ビューワー処理
  document.querySelectorAll('.gallery__tmb-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const path = this.getAttribute('href');
      document.getElementById('gallery__img').setAttribute('src', path);
    });
  });

  //topへ戻るボタン
  document.getElementById('footer__back-link').addEventListener('click', function (e) {
    e.preventDefault();
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  });

  //fadeクラス付与
  function setFadeClass() {
    const st = window.scrollY;
    document.querySelectorAll('.fade, .fadeUp').forEach(e => {
      const target = e.getBoundingClientRect().top + st;
      if (st > target - windowHeight * 0.5) {
        e.classList.add('showElement');
      }
    });
  }

  //mvの表示アニメーション
  function startMvAnimation() {
    const st = window.scrollY;
    if (st < 50) {
      document.querySelector('.mv').classList.add('startAnimation');
      document.querySelectorAll('.mv__character').forEach(e => e.classList.add('startAnimation'));
      document.querySelector('.mv__info').classList.add('startAnimation');
      document.querySelector('.header').classList.add('startAnimation');
      document.querySelector('.hamburger-icon').classList.add('startAnimation');
    } else {
      document.querySelector('.mv').classList.add('showElement');
      document.querySelectorAll('.mv__character').forEach(e => e.classList.add('showElement'));
      document.querySelector('.mv__info').classList.add('showElement');
      document.querySelector('.header').classList.add('showElement');
      document.querySelector('.hamburger-icon').classList.add('showElement');
    }
  }

  //ページ読み込み時に一度実行
  showSectionNav();
  changeHeader();
  activeSectionNavLink();
  startMvAnimation();

  //スクロール時のイベント設定
  window.addEventListener('scroll', function () {
    showSectionNav();
    changeHeader();
    activeSectionNavLink();
    setFadeClass();
  });

}, false);


//jQuery ver
// $(function () {

//   //ブラウザのビューポートの高さ
//   const windowHeight = $(window).innerHeight();

//   //ハンバーガーメニュー開閉
//   $('#hamburger-icon').on('click', function () {
//     $(this).toggleClass('is-active');
//     $('#slide-menu').toggleClass('is-active');
//   });

//   //スライドメニューのリンクhover(mouseenter)処理
//   $('.slide-menu__link').on('mouseenter', function () {
//     //既に設定されている背景用のクラスを削除
//     $('#slide-menu__bg').removeClass(function (index, className) {
//       //クラス名がbg-…のクラスを削除するための処理
//       return (className.match(/\bbg-\S+/g) || []).join(' ');
//     });

//     //背景用のクラスを設定
//     $('#slide-menu__bg').addClass('bg-' + $(this).attr('data-bg'));

//     //hover状態のクラス設定
//     $('.slide-menu__link').each(function () {
//       $(this).addClass('not-active');
//     });
//     $(this).removeClass('not-active');
//   });

//   //スライドメニューのリンクhover(mouseleave)処理
//   $('.slide-menu__link').on('mouseleave', function () {
//     $('.slide-menu__link').each(function () {
//       $(this).removeClass('not-active');
//     });
//   });

//   //ページ内リンクナビゲーション表示処理
//   const messageAreaPos = $('#message').offset().top;
//   function showSectionNav() {
//     if ($(window).scrollTop() >= messageAreaPos) {
//       $('#section-nav').addClass('is-active');
//     } else {
//       $('#section-nav').removeClass('is-active');
//     }
//   }

//   //ページ内リンクナビゲーションis-activeクラス付与処理
//   function activeSectionNavLink() {
//     const st = $(window).scrollTop();
//     $('.section').each(function () {
//       const targetPos = $(this).offset().top;
//       const targetHeight = $(this).outerHeight(true);
//       if (targetPos - windowHeight * 0.5 <= st && st <= targetPos + targetHeight - windowHeight * 0.5) {
//         const sectionId = '#' + $(this).attr('id');
//         $('.section-nav__link').each(function () {
//           const href = $(this).attr('href');
//           if (href === sectionId) {
//             $(this).addClass('is-active');
//           } else {
//             $(this).removeClass('is-active');
//           }
//         });
//         return false;
//       } else {
//         $('.section-nav__link').each(function () {
//           $(this).removeClass('is-active');
//         });
//       }
//     });
//   }

//   //スムーススクロール処理
//   $('.section-nav__link').on('click', function () {
//     const target = $(this).attr('href');
//     const targetPos = $(target).offset().top;
//     $('html, body').animate({ scrollTop: targetPos }, 500);
//     return false;
//   });

//   //リサイズヘッダー処理
//   function changeHeader() {
//     const st = $(window).scrollTop();
//     let changed = false;
//     $('.changeHeader').each(function () {
//       const targetPos = $(this).offset().top;
//       const targetHeight = $(this).outerHeight(true);
//       if (targetPos - windowHeight * 0.5 <= st && st <= targetPos + targetHeight - windowHeight * 0.5) {
//         $('#header__logo').addClass('black');
//         $('#gnav').addClass('black');
//         $('#hamburger-icon').addClass('black');
//         changed = true;
//       }
//     });
//     if (!changed) {
//       $('#header__logo').removeClass('black');
//       $('#gnav').removeClass('black');
//       $('#hamburger-icon').removeClass('black');
//     }
//   }

//   //ビューワー処理
//   $('.gallery__tmb-link').on('click', function () {
//     const path = $(this).attr('href');
//     $('#gallery__img').attr('src', path);
//     return false;
//   });

//   //topへ戻るボタン
//   $('#footer__back-link').on('click', function () {
//     $('html, body').animate({ scrollTop: 0 }, 500);
//     return false;
//   });

//   //fadeクラス付与
//   function setFadeClass() {
//     const st = $(window).scrollTop();
//     $('.fade, .fadeUp').each(function () {
//       const target = $(this).offset().top;
//       if (st > target - windowHeight * 0.5) {
//         $(this).addClass('showElement');
//       }
//     });
//   }

//   //mvの表示アニメーション
//   function startMvAnimation() {
//     const st = $(window).scrollTop();
//     if (st < 50) {
//       $('.mv').addClass('startAnimation');
//       $('.mv__character').addClass('startAnimation');
//       $('.mv__info').addClass('startAnimation');
//       $('.header').addClass('startAnimation');
//       $('.hamburger-icon').addClass('startAnimation');
//     } else {
//       $('.mv').addClass('showElement');
//       $('.mv__character').addClass('showElement');
//       $('.mv__info').addClass('showElement');
//       $('.header').addClass('showElement');
//       $('.hamburger-icon').addClass('showElement');
//     }
//   }

//   //ページ読み込み時に一度実行
//   showSectionNav();
//   changeHeader();
//   activeSectionNavLink();
//   startMvAnimation();

//   //スクロール時のイベント設定
//   $(window).on('scroll', function () {
//     showSectionNav();
//     changeHeader();
//     activeSectionNavLink();
//     setFadeClass();
//   });
// });
//jQuery verここまで