// pages/vehicleKeyboard/vehicleKeyboard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示键盘
    isKeyboard: {
      type: Boolean,
      value: false
    },
    //显示特殊按钮
    specialBtn: {
      type: Boolean,
      value: false
    },
    //数字键盘是否可以点击
    tapNum: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   * keyboard1:首页键盘,显示省的简称
   * keyboard2:第二页键盘，显示数字和大写字母
   */
  data: {
    keyboardNumber: '1234567890',
    keyboardAlph: 'QWERTYUIOPASDFGHJKLZXCVBNM',
    keyboardChi:
      '沪冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤川青藏琼宁渝使领警',
    keyboardSpe: ['del', 'ok'],
    keyboardSpeFor: ['删除', '确定'],
    keyboardValue: [],
    maxLength: 7,
    msg: '提示信息'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 显示键盘
     */
    showKeyboard: function () {
      this.setData({
        isKeyboard: true
      });
    },
    /**
     * 隐藏键盘
     */
    hideKeyboard: function () {
      if (this.data.isKeyboard) {
        this.setData({
          isKeyboard: false
        })
      }
    },
    /**
     * 点击键盘按键事件
     */
    tapKeyboard: function (e) {
      var tapVal = e.target.dataset.val;
      var keyboardValue = this.data.keyboardValue;
      var length = keyboardValue.length;
      var specialBtn;
      var tapNum;

      if (tapVal === 'del') {
        //点击删除
        if(length < 1) {
          return false;
        }

        keyboardValue.pop();
        length = keyboardValue.length;
        if (length === 0) {
          //说明没有数据了，返回到地区选择键盘
          specialBtn = false;
          tapNum = false;
        } else if (length === 1) {
          //只能输入字母
          specialBtn = true;
          tapNum = false;
        } else {
          specialBtn = true;
          tapNum = true;
        }
        this.setData({
          keyboardValue: keyboardValue,
          specialBtn: specialBtn,
          tapNum: tapNum
        });

        this.triggerEvent('input', keyboardValue.join(''));
        return false;
      }
      if(tapVal === 'ok') {
        //点击ok
        this.hideKeyboard();
        this.triggerEvent('done', keyboardValue);
        return false;
      }
      if (length >= 7) {
        return false;
      }

      keyboardValue.push(tapVal);
      length = keyboardValue.length;

      if (length > 1) {
        specialBtn = true;
        tapNum = true;
      } else {
        specialBtn = true;
        tapNum = false;
      }
      this.setData({
        keyboardValue: keyboardValue,
        specialBtn: specialBtn,
        tapNum: tapNum
      });

      this.triggerEvent('input', keyboardValue.join(''));
      return false;
    },
    /**
     * 初始化加载车牌地区字段
     * url: String, 车牌地区字段请求地址
     * update: Boolean, 是否强制更新车牌字段信息，false则使用上一次加载的缓存或者默认设置
     */
    init: function(url, update) {
      this.setData({
        keyboardValue: []
      });
      wx.setStorage({
        key: 'vehiclePlate',
        data: this.data.keyboard1
      });
      if(update) {
        wx.request({
          url: url,
          success: res => {
            //根据数据加载车牌键盘，并将结果存入缓存，同一次打开小程序不再重复请求数据
            let vehiclePlate = res; //TODO
            wx.setStorage({
              key: 'vehiclePlate',
              data: vehiclePlate,
            })
          },
          fail: err => {
            wx.showToast({
              title: '更新车牌地区数据出错，将使用默认车牌地区信息'
            })
          }
        })
      }
      this.setData({
        keyboard1: wx.getStorageSync('vehiclePlate')
      });
    },
    /**
     * 组织键盘点击事件冒泡到父容器
     */
    stopProp: function() {
      return false;
    }
  }
})
