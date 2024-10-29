System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, EditBox, instantiate, Label, Node, Sprite, Tween, tween, UIOpacity, v3, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, Main;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Color = _cc.Color;
      Component = _cc.Component;
      EditBox = _cc.EditBox;
      instantiate = _cc.instantiate;
      Label = _cc.Label;
      Node = _cc.Node;
      Sprite = _cc.Sprite;
      Tween = _cc.Tween;
      tween = _cc.tween;
      UIOpacity = _cc.UIOpacity;
      v3 = _cc.v3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "51f209gFMBMNZRGe0tD5OyU", "Main", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Color', 'color', 'Component', 'EditBox', 'instantiate', 'Label', 'Node', 'Sprite', 'Tween', 'tween', 'UIOpacity', 'v3']);

      ({
        ccclass,
        property
      } = _decorator); // const colorArray = ['#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00']

      _export("Main", Main = (_dec = ccclass('Main'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Label
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec(_class = (_class2 = class Main extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "nodeBtn", _descriptor, this);

          _initializerDefineProperty(this, "content", _descriptor2, this);

          _initializerDefineProperty(this, "editBoxX", _descriptor3, this);

          _initializerDefineProperty(this, "editBoxY", _descriptor4, this);

          _initializerDefineProperty(this, "labToast", _descriptor5, this);

          _initializerDefineProperty(this, "sprExample", _descriptor6, this);

          _initializerDefineProperty(this, "nodeParent", _descriptor7, this);

          this._sche = null;
          this.matrix = [];
          this.colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
        }

        // 5种颜色  
        //第二题
        twoSubject(a, b, v) {
          a.sort((aa, bb) => {
            //a数组 从小到大排序
            return aa - bb;
          });
          b.sort((aa, bb) => {
            //b数组 排序
            return aa - bb;
          });

          for (var i = 0; i < a.length - 1; i++) {
            if (a[i] <= v) {
              //当前值不大于v 再遍历b数组
              for (var j = 0; j < b.length - 1; j++) {
                if (a[i] + b[i] === v) {
                  return true;
                }
              }
            }
          }

          return false; //a和b数组先排序 降低时间复杂度  时间复杂度 nlogn < O < n^2
        }

        onLoad() {}

        start() {
          console.log('===cocos===');
          this.showBtnAnimation();
        } //第三题


        showBtnAnimation() {
          this.nodeBtn.setScale(0, 0, 1);
          Tween.stopAllByTarget(this.nodeBtn);
          tween(this.nodeBtn).to(0.2, {
            scale: v3(1.2, 1, 1)
          }, {
            easing: 'sineInOut'
          }).to(0.2, {
            scale: v3(1.0, 1, 1)
          }, {
            easing: 'sineInOut'
          }).call(() => {
            tween(this.nodeBtn).to(0.6, {
              scale: v3(1.1, 1.0, 1)
            }, {
              easing: 'sineInOut'
            }).to(0.6, {
              scale: v3(1.0, 1, 1)
            }, {
              easing: 'sineInOut'
            }).union().repeatForever().start();
          }).start();
        }

        onClickBtn() {}

        update(deltaTime) {}

        editBoxReturn(aa, bb) {
          var editBox = this.editBoxX;

          if (Number(aa) === 1) {
            editBox = this.editBoxY;
          }

          var str = editBox.getComponent(EditBox).string;

          if (!this.isAllNumber(str)) {
            console.error('请输入纯数字');
            this.showToast();
          }
        }

        isAllNumber(str) {
          //匹配全部由数字组成的字符串
          var regex = /^\d+$/;
          return regex.test(str);
        }

        createColorArray() {
          var xPercent = Number(this.editBoxX.getComponent(EditBox).string);
          var yPercent = Number(this.editBoxY.getComponent(EditBox).string); // 初始化矩阵

          this.matrix = [];

          for (var i = 0; i < 10; i++) {
            this.matrix[i] = [];

            for (var j = 0; j < 10; j++) {
              this.matrix[i][j] = null;
            }
          } // 设置初始点的颜色


          var idx = this.getRandomInt(0, 4);
          this.matrix[0][0] = this.colors[idx]; // 生成矩阵

          for (var _i = 0; _i < 10; _i++) {
            for (var _j = 0; _j < 10; _j++) {
              if (_i === 0 && _j === 0) continue; // 已经设置了初始点

              var probabilities = this.getProbabilities(_i, _j, xPercent, yPercent);
              this.matrix[_i][_j] = this.randomColor(probabilities);
            }
          }

          console.log(this.matrix); // 绘制矩阵

          this.drawMatrix();
        }

        drawMatrix() {
          this.nodeParent.removeAllChildren();

          for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
              var curColor = this.matrix[i][j];
              var xx = 0 + 60 * i;
              var yy = 0 - 60 * j;
              var node = instantiate(this.sprExample);
              node.active = true;
              node.parent = this.nodeParent;
              node.setPosition(xx, yy);
              node.getComponent(Sprite).color = new Color(curColor);
            }
          }
        }

        getProbabilities(m, n, x, y) {
          var baseProb = 0.2; // 初始每个颜色的概率  

          var probabilities = this.colors.map(() => baseProb); // 获取上方和左方颜色  

          var topColor = m > 0 ? this.matrix[m - 1][n] : null;
          var leftColor = n > 0 ? this.matrix[m][n - 1] : null; // 增加上方和左方颜色的概率  

          if (topColor) {
            var topProbIndex = this.colors.indexOf(topColor);
            probabilities[topProbIndex] += x / 100;

            if (leftColor === topColor) {
              probabilities[topProbIndex] += (y - x) / 100;
            }
          }

          if (leftColor) {
            var leftProbIndex = this.colors.indexOf(leftColor);
            probabilities[leftProbIndex] += x / 100;

            if (topColor === leftColor) {
              probabilities[leftProbIndex] += (y - x) / 100;
            }
          }

          var totalProb = probabilities.reduce((sum, prob) => sum + prob, 0); //计算总和

          probabilities.forEach((prob, index) => probabilities[index] = prob / totalProb); // 其他颜⾊平分剩下的概率 

          var remainingProb = 1 - probabilities.reduce((sum, prob) => sum + prob, 0);

          if (remainingProb > 0) {
            var otherColorsCount = this.colors.length - (topColor ? 1 : 0) - (leftColor ? 1 : 0) + (topColor === leftColor ? 1 : 0);
            probabilities.forEach((prob, index) => {
              if (!topColor || topColor !== this.colors[index]) {
                if (!leftColor || leftColor !== this.colors[index]) {
                  probabilities[index] += remainingProb / otherColorsCount;
                }
              }
            });
          }

          return probabilities;
        }

        randomColor(probabilities) {
          var rand = Math.random();
          var sum = 0; // if (!probabilities) {
          //     const idx = this.getRandomInt(0, 4);
          //     return this.colors[idx];
          // }

          for (var i = 0; i < probabilities.length; i++) {
            sum += probabilities[i];

            if (rand < sum) {
              console.log(i);
              return this.colors[i];
            }
          }

          return this.colors[this.colors.length - 1]; //颜色值
        }

        getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        showToast() {
          this.labToast.string = '请输入纯数字';
          this.labToast.node.getComponent(UIOpacity).opacity = 255;

          if (this._sche) {
            this.unschedule(this._sche);
            this._sche = null;
          }

          this._sche = this.scheduleOnce(() => {
            this.labToast.node.getComponent(UIOpacity).opacity = 0;
          }, 1.0);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nodeBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "editBoxX", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "editBoxY", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labToast", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sprExample", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "nodeParent", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b05c31053aebce38b05c3042fe74379c0445ce5b.js.map