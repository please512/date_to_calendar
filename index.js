export function toCalendar(el,options){
        let start=''
        let end=''
        if(Object.prototype.toString.call(options.date)=='[object Array]'){
            // console.log('数组')
            if(!options.date.length){
                options.date=[formatDate(Date.parse(new Date()))]
            }
            start=Date.parse(new Date(options.date[0]))>Date.parse(new Date(options.date[1]))?options.date[1]:options.date[0]
            end=Date.parse(new Date(options.date[0]))>Date.parse(new Date(options.date[1]))?options.date[0]:options.date[1]
            // console.log(start)
            // console.log(end)
        }else if(typeof(options.date)=='string'){
            // console.log('字符串')
            let y=new Date(options.date).getFullYear()
            let m=new Date(options.date).getMonth()+1
            let day=m!=12?new Date(new Date(y+'-'+(m+1))-1000*60*60*24).getDate():31
            start=y+'-'+m+'-'+'1'
            end=y+'-'+m+'-'+day
            console.log(start)
            console.log(end)
        }else{
            // console.log('其他')
            throw(new Error('日期格式错误！'))
        }
        let config={
            backgroundList:options.backgroundList?options.backgroundList:{
                '1':'#87CEFA',
                '2':'#8FBC8F',
                '3':'#DAA520',
                '4':'#D2691E',
                '5':'#EE82EE',
                '6':'#9370DB',
                '7':'#00E5EE',
                '8':'#009ACD',
                '9':'#EE9A49',
                '10':'#EE8262',
                '11':'#CD6090',
                '12':'#008B8B',
            },
            thColor:options.thColor?options.thColor:'#fff',
            thBackground:options.thBackground?options.thBackground:'#228B22',
            empthBackground:options.empthBackground?options.empthBackground:'#CDC5BF',
            tdWidth:options.tdWidth?options.tdWidth:120,
            tdHeight:options.tdHeight?options.tdHeight:40,
        }
        let start_num=Date.parse(new Date(start))
        let end_num=Date.parse(new Date(end))
        let collectList=[]
        let calendar=[]

        function formatDate(num){
            let y=new Date(num).getFullYear()
            let m_num=new Date(num).getMonth()+1
            let d_num=new Date(num).getDate()
            let m=m_num<10?'0'+m_num:m_num
            let d=d_num<10?'0'+d_num:d_num
            return `${y}-${m}-${d}`
        }//将时间戳转为日期

        if(start_num!=end_num){//判断不是同一天
            do{
                collectList.push(start_num)
                start_num+=1000*60*60*24
            }while(start_num<=end_num)//拿到其中的所有的时间戳collectList数组
            
            let center_todo=[]
            let times=collectList.length-1
            let count=0
            do{ 
                let week=new Date(collectList[count]).getDay()
                center_todo.push({
                    week_num:week,
                    week:week==1?'星期一':week==2?'星期二':week==3?'星期三':week==4?'星期四':week==5?'星期五':week==6?'星期六':'星期日',
                    date_num:collectList[count],
                    date:formatDate(collectList[count]),
                    background:config.backgroundList[new Date(collectList[count]).getMonth()+1],
                })
                count++
            }while(count<=times)//拿到两天之间连续的日期对象
            // console.log('连续的日期')
            // console.log(center_todo.length)

            let first_todo=[]
            let first_yu=(center_todo[0].week_num)%7
            // console.log('第一个日期对7求余')
            // console.log(first_yu)
            let first_num=first_yu==0?6:first_yu-1//前边补充日期的个数
            for(let i=0;i<first_num;i++){
                first_todo.push({
                    week_num:i+1,
                    week:i+1==1?'星期一':i+1==2?'星期二':i+1==3?'星期三':i+1==4?'星期四':i+1==5?'星期五':i+1==6?'星期六':'星期日',
                    date_num:'',
                    date:'',
                    background:config.empthBackground
                })
            }
            // console.log('头部补充的数组')
            // console.log(first_todo)//头部补充到周日

            let last_todo=[]
            let last_yu=(center_todo[center_todo.length-1].week_num)%7
            // console.log('最后一个日期对7求余')
            // console.log(last_yu)
            if(last_yu!=0){//尾部需要补充
                let last_num=7-last_yu//尾部补充日期的个数
                for(let i=0;i<last_num;i++){
                    last_todo.push({
                        week_num:last_yu+i+1,
                        week:last_yu+i+1==1?'星期一':last_yu+i+1==2?'星期二':last_yu+i+1==3?'星期三':last_yu+i+1==4?'星期四':last_yu+i+1==5?'星期五':last_yu+i+1==6?'星期六':'星期日',
                        date_num:'',
                        date:'',
                        background:config.empthBackground
                    })
                }
            }
            // console.log('尾部补充的数组')
            // console.log(last_todo)//尾部补充到周日
            
            // console.log(first_todo.concat(center_todo).concat(last_todo))
            let calendar_sub=first_todo.concat(center_todo).concat(last_todo)
            let week_total=calendar_sub.length/7
            // console.log('一共的周数')
            // console.log(week_total)
            for(let i=1;i<=week_total;i++){
                calendar.push([])
            }
            for(let i=0;i<calendar_sub.length;i++){
                let index=parseInt(i/7)
                calendar[index].push(calendar_sub[i])
            }
            // console.log('最终生成的日历二维数组')
            // console.log(calendar)
        }else{
            let week_num=new Date(start).getDay()
            // console.log(week_num)
            let first_todo=[]
            let first_yu=week_num%7
            let first_num=first_yu==0?6:first_yu-1//前边补充日期的个数
            for(let i=0;i<first_num;i++){
                first_todo.push({
                    week_num:i+1,
                    week:i+1==1?'星期一':i+1==2?'星期二':i+1==3?'星期三':i+1==4?'星期四':i+1==5?'星期五':i+1==6?'星期六':'星期日',
                    date_num:'',
                    date:'',
                    background:config.empthBackground
                })
            }
            // console.log('头部')
            // console.log(first_todo)

            let last_todo=[]
            let last_yu=week_num%7
            if(last_yu!=0){//尾部需要补充
                let last_num=7-last_yu//尾部补充日期的个数
                for(let i=0;i<last_num;i++){
                    last_todo.push({
                        week_num:last_yu+i+1,
                        week:last_yu+i+1==1?'星期一':last_yu+i+1==2?'星期二':last_yu+i+1==3?'星期三':last_yu+i+1==4?'星期四':last_yu+i+1==5?'星期五':last_yu+i+1==6?'星期六':'星期日',
                        date_num:'',
                        date:'',
                        background:config.empthBackground
                    })
                }
            }
            // console.log('尾部')
            // console.log(last_todo)
            calendar=calendar.concat(first_todo)
            calendar.push({
                week_num:week_num,
                week:week_num==1?'星期一':week_num==2?'星期二':week_num==3?'星期三':week_num==4?'星期四':week_num==5?'星期五':week_num==6?'星期六':'星期日',
                date_num:Date.parse(new Date(start)),
                date:formatDate(Date.parse(new Date(start))),
                background:config.backgroundList[new Date(start).getMonth()+1]
            })
            calendar=calendar.concat(last_todo)
            calendar=[calendar]
            // console.log(calendar)
        }

        // const otable=document.getElementById('table')
        let otr=`<tr><th style="background:${config.thBackground};color:${config.thColor};border: 1px #EEE9E9 solid;width:${config.tdWidth}px;height: ${config.tdHeight}px;text-align: center;">星期一</th><th style="background:${config.thBackground};color:${config.thColor};border: 1px #EEE9E9 solid;width:${config.tdWidth}px;height: ${config.tdHeight}px;text-align: center;">星期二</th><th style="background:${config.thBackground};color:${config.thColor};border: 1px #EEE9E9 solid;width:${config.tdWidth}px;height: ${config.tdHeight}px;text-align: center;">星期三</th><th style="background:${config.thBackground};color:${config.thColor};border: 1px #EEE9E9 solid;width:${config.tdWidth}px;height: ${config.tdHeight}px;text-align: center;">星期四</th><th style="background:${config.thBackground};color:${config.thColor};border: 1px #EEE9E9 solid;width:${config.tdWidth}px;height: ${config.tdHeight}px;text-align: center;">星期五</th><th style="background:${config.thBackground};color:${config.thColor};border: 1px #EEE9E9 solid;width:${config.tdWidth}px;height: ${config.tdHeight}px;text-align: center;">星期六</th><th style="background:${config.thBackground};color:${config.thColor};border: 1px #EEE9E9 solid;width:${config.tdWidth}px;height: ${config.tdHeight}px;text-align: center;">星期日</th></tr>`

        for(let i=0;i<calendar.length;i++){
            let otd=''
            for(let j=0;j<calendar[i].length;j++){
                otd+=`<td style="cursor:pointer;color:#fff;background:${calendar[i][j].background};border:${calendar[i][j].background?'1px #EEE9E9 solid':''};width:${config.tdWidth}px;height: ${config.tdHeight}px;text-align: center;">${calendar[i][j].date}</td>`
            }
            otr+=`<tr>`+
                otd+
            `</tr>`
        }
        let otable = document.createElement('table')
        otable.setAttribute('id','table')
        otable.setAttribute('style','border-collapse: collapse;')
        otable.innerHTML=otr
        if(document.getElementById(el)){
            document.getElementById(el).appendChild(otable)
        }else{
            throw(new Error('无法找到#'+el+'节点'))
        }
    }