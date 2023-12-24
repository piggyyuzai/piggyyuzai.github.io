function init() {
  /* noise */
  const noisebox = document.querySelector(".whitenoise");
  const ctx = noisebox.getContext("2d");

  function resize() {
    noisebox.width = window.innerWidth;
    noisebox.height = window.innerHeight;
  }
  resize();//初始化
  window.onresize = resize;//窗口变动自动调整

  function noise(ctx) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const idata = ctx.createImageData(w, h);
    const buffer32 = new Uint32Array(idata.data.buffer);//32位整数数组，存放像素

    for (let i = 0; i < buffer32.length; )
      buffer32[i++] = ((255 * Math.random()) | 0) << 24;
    //循环遍历数组并为每个元素分配一个随机256颜色。<<24是将数值左移24位，确保颜色值被正确地存储在32位整数中。i++更新索引
    ctx.putImageData(idata, 0, 0);
  }

  let toggle = true;

  // added toggle to get 30 FPS instead of 60 FPS
  (function loop() {
    toggle = !toggle;
    if (toggle) {
      requestAnimationFrame(loop);
      return;
    }
    noise(ctx);
    requestAnimationFrame(loop);
  })();
}

window.addEventListener("DOMContentLoaded", init);
