> 记录一下有价值的技术细节

#### 1. 网络图片转 base64

convas 对象有一个 `toDataURL('image/jpeg')` 方法,可以将图片转化为`data:image`格式的,然后从结果中取 base64 就行,`.split(",")[1];`

```js
let image = new Image();
image.src = item;
image.onload = function () {
  this.base64 = getBase64Image(image);
};

// 方法
function getBase64Image(img) {
  // 绝对路径转dataURL
  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", new Date().valueOf());
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  let dataURL = canvas.toDataURL("image/jpeg"); // 关键方法
  return dataURL;
}
```

#### 2. 本地图片转 base64

需要用到`FileReader`方法;

```js
// 这个 f 是 File 类型,就是一个文件对象
this.imgUrl = URL.createObjectURL(f);

const reader = new FileReader();
reader.readAsDataURL(f);
reader.onload = (e) => {
  // e.target.result 是 data:image 类型的,然后从里面截取 base64
  this.imgData = e.target.result.split(",")[1];
  console.log(7, this.imgData);
};
```

#### 3. 在视频流里面截取图片,并转为 base64

网页如下所示,有 立即拍照按钮,点击之后 开始加载视频,调用本地摄像头, 确定按钮点击后就可以 截取当前画面

```html
<el-tab-pane label="立即拍照" name="2">
  <el-row type="flex" justify="center">
    <el-button class="b2" @click="startCamera">立即拍照</el-button>
  </el-row>
  <el-row type="flex" justify="center">
    <video id="video"></video>
    <button class="btn" v-if="show" @click="getImgBase64StrFromVideo">确定</button>
  </el-row>
</el-tab-pane>
```

关键方法如下

```js
// 初始化 api.检查兼容性
 mediaDevicesInit: function () {
          if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
          }
          if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
              let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
              if (!getUserMedia) {
                return Promise.reject(new Error("getUserMedia is not implemented in this browser"));
              }
              return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
              });
            };
          }
        },

// 点开始视频后执行本方法
function startCamera () {
          setTimeout(() => {
            this.show = true;
          }, 1000);
          let me = this;
          navigator.mediaDevices
            .getUserMedia({ audio: true, video: true })
            .then(function (stream) {
              let video = document.getElementsByTagName("video")[0];
              me.videoAbout.outStream = stream;
              // Older browsers may not have srcObject
              if ("srcObject" in video) {
                video.srcObject = stream;
              } else {
                // Avoid using this in new browsers, as it is going away.
                video.src = window.URL.createObjectURL(stream);
              }
              video.onloadedmetadata = function (e) {
                video.play();
              };
            })
            .catch(function (err) {
              console.log(err);
            });
        },
// 截取视频内容,并转化为 base64
         getImgBase64StrFromVideo() {
          let video = document.getElementsByTagName("video")[0];
          let canvas = document.getElementById("vShot");
          let context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          let imgData = canvas.toDataURL().split(",")[1];
          console.log(3, imgData);
          this.imgData = imgData;
        },
```

#### 4. 用 canvas 展示视频

使用`setInterval`每隔 20ms 调用`drawImage(video,)`,肉眼看起来与 视频差别不大;
