class MagneticText {
  constructor() {
    this.texts = []; // 存储所有文字元素
    this.mouse = { x:0, y:0, vx:0, vy:0, prevX:0, prevY:0 };
    this.attractionRadius = 200; // 吸附半径
    this.releaseThreshold = 10; // 甩动释放速度阈值
    this.initTexts();
    this.bindEvents();
    this.animate();
  }

  // 初始化文字元素
  /**
   * 初始化文本内容并将其添加到页面中。
   * 该方法创建一组文本元素，设置其位置、字体大小和过渡效果。
   * 文本内容包括与磁铁相关的词汇，布局为自动换行。
   * 
   * @method initTexts
   * @memberof YourClassName
   * @returns {void}
   */
  initTexts() {
    // 完整滕王阁序文本（节选）按字分割
    // const contents = `豫章故郡洪都新府星分翼轸地接衡庐襟三江而带五湖控蛮荆而引瓯越物华天宝龙光射牛斗之墟人杰地灵徐孺下陈蕃之榻雄州雾列俊采星驰台隍枕夷夏之交宾主尽东南之美都督阎公之雅望棨戟遥临宇文新州之懿范襜帷暂驻十旬休假胜友如云千里逢迎高朋满座腾蛟起凤孟学士之词宗紫电青霜王将军之武库家君作宰路出名区童子何知躬逢胜饯`.split('');
    const contents=`滕王阁序
　　 豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰，台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电清霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。
　　时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑于上路，访风景于崇阿。临帝子之长洲，得天人之旧馆。层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，即（一作 列）冈峦之体势。
　　披绣闼，俯雕甍。山原旷其盈视，川泽纡其骇瞩。闾阎 扑地，钟鸣鼎食之家；舸舰弥津，青雀黄龙之舳。云销雨霁，彩彻区明（或作 虹销雨霁，彩彻云衢）。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。
　　遥襟甫畅，逸兴遄飞。爽籁发而清风生，纤歌凝而白云遏。睢园绿竹，气凌彭泽之樽；邺水朱华，光照临川之笔。四美具，二难并。穷睇眄于中天，极娱游于暇日。天高地迥(jiǒng)，觉宇宙之无穷；兴尽悲来，识盈虚之有数。望长安于日下，目吴会（kuài）于云间。地势极而南溟(míng)深，天柱高而北辰远。关山难越，谁悲失路之人；萍水相逢，尽是他乡之客。怀帝阍(hūn)而不见，奉宣室以何年。
　　嗟(jiē)乎！时运不齐，命途多舛(chuǎn)；冯唐易老，李广难封。屈贾谊（yì）于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子见机，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙（hé zhé）以犹欢。北海虽赊（shē），扶摇可接；东隅(yú)已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！
　　勃，三尺微命，一介书生。无路请缨，等终军之弱冠（guàn）；有怀投笔，慕宗悫（què）之长风。舍簪（zān）笏（hù）于百龄，奉晨昏于万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨(tāo)陪鲤对；今兹捧袂(mèi)，喜托龙门。杨意不逢，抚凌云而自惜；钟期既遇，奏流水以何惭？
　　呜呼！胜地不常，盛筵(yán)难再；兰亭已矣，梓(zǐ) 泽丘墟。临别赠言，幸承恩于伟饯；登高作赋，是所望于群公。敢竭鄙怀，恭疏短引；一言均赋，四韵俱成。请洒潘江，各倾陆海云尔。　
　　滕王高阁临江渚，佩玉鸣鸾罢歌舞。
　　画栋朝飞南浦云，珠帘暮卷西山雨。
　　闲云潭影日悠悠，物换星移几度秋。
　　阁中帝子今何在？槛外长江空自流。`.split('');
    contents.forEach((text, i) => {
      const el = document.createElement('div');
      el.className = 'text';
      el.textContent = text;
      // 古籍竖排布局
      const columnWidth = 40; // 列宽
      const lineHeight = 40; // 行高
      const columns = Math.floor(window.innerWidth / columnWidth);
      const col = columns - 1 - Math.floor(i / Math.floor(window.innerHeight / lineHeight)); // 从右向左排列
      const row = i % Math.floor(window.innerHeight / lineHeight);
      
      el.style.left = `${col * columnWidth + 20}px`;
      el.style.top = `${row * lineHeight + 20}px`;
      el.style.fontSize = `20px`;
      el.style.lineHeight = `1em`;
      el.style.writingMode = 'vertical-rl'; // 竖排文字
      el.style.transition = `all 0.3s cubic-bezier(0.25, 0.46, 0.45, 1.${i%10})`;
      // 添加旋转动画类（需在CSS中定义）
      document.body.appendChild(el);
      this.texts.push({
        element: el,
        originX: parseFloat(el.style.left),
        originY: parseFloat(el.style.top),
        isAttracted: false
      });
    });
  }

  // 绑定事件
  bindEvents() {
    document.addEventListener('mousemove', e => {
      this.mouse.prevX = this.mouse.x;
      this.mouse.prevY = this.mouse.y;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      // 计算鼠标移动速度
      this.mouse.vx = this.mouse.x - this.mouse.prevX;
      this.mouse.vy = this.mouse.y - this.mouse.prevY;
    });
  }

  // 动画循环
  animate() {
    requestAnimationFrame(() => this.animate());
    this.texts.forEach(text => {
      const dx = this.mouse.x - parseFloat(text.element.style.left);
      const dy = this.mouse.y - parseFloat(text.element.style.top);
      const distance = Math.sqrt(dx*dx + dy*dy);

      // 吸附逻辑
      if (distance < this.attractionRadius) {
        const force = (1 - distance/this.attractionRadius) * 0.5;
        // 直接修改left/top属性实现吸附
        const currentLeft = parseFloat(text.element.style.left);
        const currentTop = parseFloat(text.element.style.top);
        text.element.style.left = `${currentLeft + dx*force}px`;
        text.element.style.top = `${currentTop + dy*force}px`;
        // text.classList.add('rotate-animation');
        text.isAttracted = true;
      } else if (!text.isAttracted) {
        // 回归原位
        text.element.style.left = `${text.originX}px`;
        text.element.style.top = `${text.originY}px`;
      }

      // 甩动释放检测
      const speed = Math.sqrt(this.mouse.vx*this.mouse.vx + this.mouse.vy*this.mouse.vy);
      if (speed > this.releaseThreshold) {
        text.isAttracted = false;
      }

      //鼠标磁铁轻微旋转
      const cursor = document.getElementById('cursor');
      cursor.style.left = `${this.mouse.x -10}px`;
      cursor.style.top = `${this.mouse.y -10}px`;
      // 根据吸附文字数量调整磁铁颜色强度
      const attractedCount = this.texts.filter(t => t.isAttracted).length;
      cursor.style.opacity = Math.min(0.3 + attractedCount*0.05, 0.8);
      cursor.style.transform = `scale(${1 + attractedCount*0.05})`;
    });
  }
}

new MagneticText();
