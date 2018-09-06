function pukecalc_zhushu(){
    //包选/单选/任选一注数计算
    this.calc_danchengzhu = function(length){
        return length;
    }
    //任选二
    this.calc_renxuantwo = function(length){
        switch(length){
            case 1:
                this.zhushu = 0
                return 0
            case 2:
                this.zhushu = 1
                return 1
            case 3:
                this.zhushu = 3
                return 3
            case 4:
                this.zhushu = 6
                return 6
            case 5:
                this.zhushu = 10
                return 10
            case 6:
                this.zhushu = 15
                return 15
            case 7:
                this.zhushu = 21
                return 21
            case 8:
                this.zhushu = 21
                return 21
            case 9:
                this.zhushu = 36
                return 36
            case 10:
                this.zhushu = 45
                return 45
            case 11:
                this.zhushu = 55
                return 55
            case 12:
                this.zhushu = 66
                return 66
            case 13:
                this.zhushu = 78
                return 78
        }
    }

    // 任选三
    this.calc_renxuanthree = function(length){
        switch(length){
            case 1:
                this.zhushu = 0
                return 0
            case 2:
                this.zhushu = 0
                return 0
            case 3:
                this.zhushu = 1
                return 1
            case 4:
                this.zhushu = 4
                return 4
            case 5:
                this.zhushu = 10
                return 10
            case 6:
                this.zhushu = 20
                return 20
            case 7:
                this.zhushu = 35
                return 35
            case 8:
                this.zhushu = 56
                return 56
            case 9:
                this.zhushu = 84
                return 84
            case 10:
                this.zhushu = 120
                return 120
            case 11:
                this.zhushu = 165
                return 165
            case 12:
                this.zhushu = 220
                return 220
            case 13:
                this.zhushu = 286
                return 286
        }
    }

     // 任选四
     this.calc_renxuanfour = function(length){
        switch(length){
            case 1:
                this.zhushu = 0
                return 0
            case 2:
                this.zhushu = 0
                return 0
            case 3:
                this.zhushu = 0
                return 0
            case 4:
                this.zhushu = 1
                return 1
            case 5:
                this.zhushu = 5
                return 5
            case 6:
                this.zhushu = 15
                return 15
            case 7:
                this.zhushu = 35
                return 35
            case 8:
                this.zhushu = 70
                return 70
            case 9:
                this.zhushu = 126
                return 126
            case 10:
                this.zhushu = 210
                return 210
            case 11:
                this.zhushu = 330
                return 330
            case 12:
                this.zhushu = 495
                return 495
            case 13:
                this.zhushu = 715
                return 715
        }
     } 
      
    //  任选五
    this.calc_renxuanfive = function(length){
        switch(length){
            case 1:
                this.zhushu = 0
                return 0
            case 2:
                this.zhushu = 0
                return 0
            case 3:
                this.zhushu = 0
                return 0
            case 4:
                this.zhushu = 0
                return 0  
            case 5:
            this.zhushu = 1
            return 1
            case 6:
            this.zhushu = 6
            return 6
            case 7:
            this.zhushu = 21
            return 21
            case 8:
            this.zhushu = 56
            return 56
            case 9:
            this.zhushu = 126
            return 126
            case 10:
            this.zhushu = 252
            return 252
            case 11:
            this.zhushu = 462
            return 462
            case 12:
            this.zhushu = 792
            return 792
            case 13:
            this.zhushu = 1287
            return 1287
        }
    }

    //任选六
    this.clac_renxunasix = function(length){
        switch(length){
            case 1:
                this.zhushu = 0
                return 0
            case 2:
                this.zhushu = 0
                return 0
            case 3:
                this.zhushu = 0
                return 0
            case 4:
                this.zhushu = 0
                return 0
            case 5:
                this.zhushu = 0
                return 0
            case 6:
            this.zhushu = 1
            return 1
            case 7:
            this.zhushu = 7
            return 7
            case 8:
            this.zhushu = 28
            return 28
            case 9:
            this.zhushu = 84
            return 84
            case 10:
            this.zhushu = 210
            return 210
            case 11:
            this.zhushu = 462
            return 462
            case 12:
            this.zhushu = 924
            return 924
            case 13:
            this.zhushu = 1716
            return 1716
        }
    }

}

export{ pukecalc_zhushu }