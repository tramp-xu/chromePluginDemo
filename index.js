console.log(_window)
new Vue({
  el: '#app',
  data: function() {
    return {
      date1: '',
      hostname: '',
      keyword: ''
    }
  },
  mounted() {
    this.getSelectedTab()
    this.setKeyword()
  },
  computed: {
    isTaobaoCart () {
      return this.hostname === "www.baidu.com"
    }
  },
  methods: {
    setKeyword () {
      let dom = document.querySelector('#kw')
      console.log(dom)
    },
    getSelectedTab () {
      var _this = this
      chrome.tabs.getSelected(function (tab) {
        console.log(tab);
        let url = tab.url
        reg = /\/\/(.+?)\//g
        let arr = url.split(reg)
        _this.hostname = arr.length ? arr[1] : ''
    });
      // var notification =  window.webkitNotifications.createNotification(
      //   'Hello!',  // notification title
      //   'Lorem ipsum...'  // notification body text
      // );
      // notification.show();
    },
    sleep (delay) {
      var start = (new Date()).getTime();
      while ((new Date()).getTime() - start < delay) {
        continue;
      }
    },
    submitClick () {
      var submitBtn = document.querySelector('.submit-btn')
      submitBtn.click()
    },
    submitOrderClick () {
      var submitBtn = document.querySelector('.go-btn')
      submitBtn.click()
    },
    postOrder () {
      let hostname = window.location.hostname
      if (hostname === "buy.tmall.com") {
        var realPayPrice = document.querySelector(".realPay-price").innerHTML
        var numRealPayPrice = realPayPrice ? Number(realPayPrice) : ''
        if (numRealPayPrice) {
          this.submitOrderClick()
        } else {
          const _this = this
          setInterval(function () {
            _this.submitOrderClick()
          }, 100)
        }
      } else if (hostname === "cart.taobao.com") {
        var allCheckBtn = document.querySelector('.J_SelectAll')
        if (!allCheckBtn) return
        allCheckBtn.click()
        var J_Total = document.querySelector('#J_SelectedItemsCount').innerHTML
        var numTotal = J_Total ? Number(J_Total) : ''
        if (numTotal) {
          this.submitClick()
        } else {
          const _this = this
          setInterval(function () {
            _this.submitClick()
          }, 200)
        }
      } else {
        alert('dddd')
        window.location.href = "https://cart.taobao.com"
        window.location.reload()
      }
    },
    start () {
      if (!this.date1) {
        this.$message({
          type: 'warning',
          message: '请输入启动时间'
        })
      } else {
        this.postOrder()
      }
    }
  }
})



// function submitClick () {
//   var submitBtn = document.querySelector('.submit-btn')
//   submitBtn.click()
// }
// function submitOrderClick () {
//   var submitBtn = document.querySelector('.go-btn')
//   submitBtn.click()
// }
// function stop () {
//   alert('$')
// }
// window.onload = function() {

//   let hostname = window.location.hostname
//   if (hostname === "buy.tmall.com") {
//     var realPayPrice = document.querySelector(".realPay-price").innerHTML
//     var numRealPayPrice = realPayPrice ? Number(realPayPrice) : ''
//     if (numRealPayPrice) {
//       submitOrderClick()
//     } else {
//       setInterval(function () {
//         submitOrderClick()
//       }, 100)
//     }
//   } else if ("cart.taobao.com") {
//     var allCheckBtn = document.querySelector('.J_SelectAll')
//     allCheckBtn.click()
//     var J_Total = document.querySelector('#J_SelectedItemsCount').innerHTML
//     var numTotal = J_Total ? Number(J_Total) : ''
//     if (numTotal) {
//       submitClick()
//     } else {
//       setInterval(function () {
//         submitClick()
//       }, 100)
//     }
//   }
// }