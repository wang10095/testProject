import { _decorator, Button, Color, color, Component, EditBox, instantiate, Label, Node, Sprite, Tween, tween, UIOpacity, v3 } from 'cc';
const { ccclass, property } = _decorator;

// const colorArray = ['#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00']

@ccclass('Main')
export class Main extends Component {
    @property({
        type: Node
    })
    nodeBtn: Node = null;

    @property({
        type: Node
    })
    content: Node = null;

    @property({
        type: Node
    })
    editBoxX: Node = null;

    @property({
        type: Node
    })
    editBoxY: Node = null;

    @property({
        type: Label
    })
    labToast: Label = null;

    @property({
        type: Node
    })
    sprExample: Node = null;

    @property({
        type: Node
    })
    nodeParent: Node = null;

    _sche = null;
    matrix = [];
    private colors: string[] = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']; // 5种颜色  


    //第二题
    twoSubject(a: number[], b: number[], v: number) {
        a.sort((aa, bb) => { //a数组 从小到大排序
            return aa - bb;
        })
        b.sort((aa, bb) => { //b数组 排序
            return aa - bb;
        })

        for (let i = 0; i < a.length - 1; i++) {
            if (a[i] <= v) { //当前值不大于v 再遍历b数组
                for (let j = 0; j < b.length - 1; j++) {
                    if (a[i] + b[i] === v) {
                        return true;
                    }
                }
            }
        }
        return false;

        //a和b数组先排序 降低时间复杂度  时间复杂度 nlogn < O < n^2
    }


    onLoad(): void {

    }

    start() {
        console.log('===cocos===')

        this.showBtnAnimation();
    }

    //第三题
    showBtnAnimation() {
        this.nodeBtn.setScale(0, 0, 1);
        Tween.stopAllByTarget(this.nodeBtn);

        tween(this.nodeBtn).to(0.2, { scale: v3(1.2, 1, 1) }, { easing: 'sineInOut' })
            .to(0.2, { scale: v3(1.0, 1, 1) }, { easing: 'sineInOut' })
            .call(() => {
                tween(this.nodeBtn).to(0.6, { scale: v3(1.1, 1.0, 1) }, { easing: 'sineInOut' })
                    .to(0.6, { scale: v3(1.0, 1, 1) }, { easing: 'sineInOut' })
                    .union()
                    .repeatForever()
                    .start();
            })
            .start();
    }

    onClickBtn() {

    }

    update(deltaTime: number) {

    }

    editBoxReturn(aa, bb) {
        let editBox = this.editBoxX;
        if (Number(aa) === 1) {
            editBox = this.editBoxY;
        }
        const str = editBox.getComponent(EditBox).string;
        if (!this.isAllNumber(str)) {
            console.error('请输入纯数字')
            this.showToast();
        }

    }

    isAllNumber(str) {
        //匹配全部由数字组成的字符串
        const regex = /^\d+$/;
        return regex.test(str);
    }

    createColorArray() {
        const xPercent = Number(this.editBoxX.getComponent(EditBox).string);
        const yPercent = Number(this.editBoxY.getComponent(EditBox).string);

        // 初始化矩阵
        this.matrix = [];
        for (let i = 0; i < 10; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < 10; j++) {
                this.matrix[i][j] = null;
            }
        }

        // 设置初始点的颜色
        const idx = this.getRandomInt(0, 4);
        this.matrix[0][0] = this.colors[idx];

        // 生成矩阵
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (i === 0 && j === 0) continue; // 已经设置了初始点
                let probabilities = this.getProbabilities(i, j, xPercent, yPercent);
                this.matrix[i][j] = this.randomColor(probabilities);
            }
        }

        console.log(this.matrix);
        // 绘制矩阵
        this.drawMatrix();
    }

    drawMatrix() {
        this.nodeParent.removeAllChildren();
        //从左到右 从上到下

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const curColor: string = this.matrix[i][j];

                const xx = 0 + 60 * i;
                const yy = 0 - 60 * j;

                const node = instantiate(this.sprExample);
                node.active = true;
                node.parent = this.nodeParent;
                node.setPosition(xx, yy);
                node.getComponent(Sprite).color = new Color(curColor);
            }
        }
    }

    getProbabilities(m, n, x, y) {
        const baseProb = 0.2; // 初始每个颜色的概率  
        const probabilities = this.colors.map(() => baseProb);

        // 获取上方和左方颜色  
        let topColor = m > 0 ? this.matrix[m - 1][n] : null;
        let leftColor = n > 0 ? this.matrix[m][n - 1] : null;

        // 增加上方和左方颜色的概率  
        if (topColor) {
            const topProbIndex = this.colors.indexOf(topColor);
            probabilities[topProbIndex] += x / 100;
            if (leftColor === topColor) {
                probabilities[topProbIndex] += (y - x) / 100;
            }
        }

        if (leftColor) {
            const leftProbIndex = this.colors.indexOf(leftColor);
            probabilities[leftProbIndex] += x / 100;
            if (topColor === leftColor) {
                probabilities[leftProbIndex] += (y - x) / 100;
            }
        }


        const totalProb = probabilities.reduce((sum, prob) => sum + prob, 0); //计算总和
        probabilities.forEach((prob, index) => probabilities[index] = prob / totalProb);

        // 其他颜⾊平分剩下的概率 
        const remainingProb = 1 - probabilities.reduce((sum, prob) => sum + prob, 0);
        if (remainingProb > 0) {
            const otherColorsCount = this.colors.length - (topColor ? 1 : 0) - (leftColor ? 1 : 0) + (topColor === leftColor ? 1 : 0);
            probabilities.forEach((prob, index: number) => {
                if (!topColor || topColor !== this.colors[index]) {
                    if (!leftColor || leftColor !== this.colors[index]) {
                        probabilities[index] += remainingProb / otherColorsCount;
                    }
                }
            });
        }

        return probabilities;
    }

    //随机出一个颜色
    randomColor(probabilities: number[]): string {
        const rand = Math.random();
        let sum = 0;

        // if (!probabilities) {
        //     const idx = this.getRandomInt(0, 4);
        //     return this.colors[idx];
        // }

        for (let i = 0; i < probabilities.length; i++) {
            sum += probabilities[i];
            if (rand < sum) {
                console.log(i);
                return this.colors[i];
            }
        }

        return this.colors[this.colors.length - 1];  //颜色值
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


}

