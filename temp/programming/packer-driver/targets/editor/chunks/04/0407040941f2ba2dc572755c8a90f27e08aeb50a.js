System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Sprite, Tween, tween, v3, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _crd, ccclass, property, menu, EventType, UIButton;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Button = _cc.Button;
      Sprite = _cc.Sprite;
      Tween = _cc.Tween;
      tween = _cc.tween;
      v3 = _cc.v3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "726bdSTYDFNK6tGYRACpmY6", "UIButton", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'EventTouch', 'EventHandler', 'Button', 'Sprite', 'AudioSource', 'Tween', 'tween', 'v3']);

      ({
        ccclass,
        property,
        menu
      } = _decorator);

      EventType = /*#__PURE__*/function (EventType) {
        EventType["CLICK"] = "click";
        return EventType;
      }(EventType || {});

      _export("default", UIButton = (_dec = menu('core/UIButton'), _dec2 = property({
        tooltip: '是否可以连点'
      }), _dec3 = property({
        tooltip: '是否支持长按'
      }), _dec4 = property({
        tooltip: '长按间隔时间',
        visible: function () {
          return this.longTouch;
        }
      }), _dec5 = property({
        tooltip: '连点间隔时间(毫秒)',
        visible: function () {
          return !this.combo;
        }
      }), ccclass(_class = _dec(_class = (_class2 = (_class3 = class UIButton extends Button {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "combo", _descriptor, this);

          _initializerDefineProperty(this, "longTouch", _descriptor2, this);

          _initializerDefineProperty(this, "longTouchInterval", _descriptor3, this);

          _initializerDefineProperty(this, "damping", _descriptor4, this);

          this.lastTime = 0;
          this.startFunc = null;
          this.endFunc = null;
          // 点击音效
          this._func = null;
        }

        /**
         * 添加回调函数 btn.call(()=>{});`
         * @param startFunc 触摸开始后的回调函数
         * @param endFunc 触摸结束后的回调函数
         * */
        call(startFunc, endFunc) {
          this.startFunc = startFunc;
          this.endFunc = endFunc;
        }

        _onTouchBegan(event) {
          Tween.stopAllByTarget(this.node);

          super._onTouchBegan(event);

          this.startFunc && this.startFunc(this.node);

          this._func = () => {
            Component.EventHandler.emitEvents(this.clickEvents, event);
          };

          if (this.longTouch) {
            this.schedule(this._func, this.longTouchInterval);
          }
        }

        _onTouchEnded(event) {
          if (!this._interactable || !this.enabledInHierarchy) {
            return;
          }

          tween(this.node).to(0.6, {
            scale: v3(1.1, 1.0, 1)
          }, {
            easing: 'sineInOut'
          }).to(0.6, {
            scale: v3(1.0, 1, 1)
          }, {
            easing: 'sineInOut'
          }).union().repeatForever().start();

          if (this._pressed) {
            let now = Date.now();
            const delta = now - this.lastTime;

            if (!this.combo && delta < this.damping) {
              console.log('%c屏蔽快速点击_onTouchBegan', 'color:red');
            } else {
              this.lastTime = now;
              Component.EventHandler.emitEvents(this.clickEvents, event);
              this.node.emit(EventType.CLICK, this);
              this.endFunc && this.endFunc(this.node);
            } // 回调函数


            if (this.longTouch && this._func) {
              this.unschedule(this._func);
              this._func = null;
            }
          }

          this._pressed = false;

          this._updateState();

          if (event) {
            event.propagationStopped = true;
          }
        }

        _onTouchCancel(event) {
          super._onTouchCancel(event); // 回调函数


          this.endFunc && this.endFunc(this.node);

          if (this.longTouch && this._func) {
            this.unschedule(this._func);
            this._func = null;
          }
        } // 仅置灰


        set grayScale(value) {
          const iconSpr = this.node.getComponent(Sprite) || this.node.getComponentInChildren(Sprite);

          if (iconSpr) {
            iconSpr.grayscale = value;
          }
        } // 可交互状态


        set interactable(value) {
          const iconSpr = this.node.getComponentInChildren(Sprite);

          if (iconSpr) {
            iconSpr.grayscale = !value;
          }

          if (this._interactable === value) {
            return;
          }

          this._interactable = value;

          this._updateState();

          if (!this._interactable) {
            this._resetState();
          }
        }

      }, _class3.clickAudio = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "combo", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "longTouch", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "longTouchInterval", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.2;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "damping", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 300;
        }
      })), _class2)) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0407040941f2ba2dc572755c8a90f27e08aeb50a.js.map