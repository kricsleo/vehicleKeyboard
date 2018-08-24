// index.js
Page({
    /**
     *  初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
      //选择到键盘组件
      this.setData({
        keyboard: this.selectComponent('#keyboard')
      });
      //初始化更新键盘地区信息
      this.data.keyboard.update("https://www.easy-mock.com/mock/5b7659524d2b8f332fda9647/demo/getVehicleDict");
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},

    /**
     * 显示键盘，同时设置虚拟输入框为激活状态
     */
    showKeyboard: function() {
      this.setData({
        isFocus: true
      })
      this.data.keyboard.showKeyboard();
    },

    /**
     * 隐藏键盘，同时设置虚拟输入框为未激活状态
     */
    hideKeyboard: function(e) {
      this.setData({
        isFocus: false
      });
      this.data.keyboard.hideKeyboard();
    },

    /**
     * 配合键盘输入事件：input，获取输入内容到虚拟输入框中
     */
    inputChange: function(e) {
        this.setData({
            textValue: e.detail
        });
    },

    /**
     * 配合键盘点击‘完成’事件：done，设置虚拟输入框为未激活状态
     */
    inputDone: function() {
        this.setData({
            isFocus: false
        })
    }
});
