/* eslint-disable */
(function(factory) {

    var trace = function(i) { console.log('rrwebSDK : ' + i); };

    if (typeof module === 'object' && typeof module.exports === 'object') {
        trace('import ... ');
        let rrweb = require('./rrweb-1.1.1.js');
        trace('import ... ok');
        module.exports = factory(trace, rrweb);
    } else {
        trace('load ... ');
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = false;
        script.onload = function() {
            trace('load ... ok');
            (window.onReady || window.onready || function(){})(factory(trace, rrweb));
        }
        script.src = 'https://cdn.ecs2pay.com/rrweb/rrweb-1.1.1.js';
        //document.body.appendChild(script);
        document.getElementsByTagName('script')[0].parentNode.appendChild(script);
    }

}(function(trace, rrweb) {
    return function(options) {

        var status = {
            timer : null,
            events : [],
            stop : true,
        };

        var config = {
            reportUrl : 'https://www.yunbaoxiao.com.cn/recall',
            reportTimes : 3,
            notSupportInfo : '浏览器版本过低，需要 IE11+ 以上版本。',
            notSupportEvent : null,
        };

        var cache = {
            recallCode : '',
            busCode: '',
            goodsCode: '',
            goodsVersion: '',
        }


        var _cache = function(a) {
            var c = window.sessionStorage, k = 'rrwebsdk_cache';
            switch(a) {
                case undefined: return JSON.parse(c.getItem(k)) || cache;
                case null: c.removeItem(k); break;
                default: c.setItem(k, JSON.stringify(cache));
            }
        }

        var _report = function(callback) {
            //trace('report ...');
            if (!status.events.length) {
                trace('report ... ignore');
                if (typeof callback == 'function') callback(true);
                return;
            }
            var events = [].concat(status.events); status.events = [];
            var data = JSON.parse(JSON.stringify(cache));
            data.events = JSON.stringify({ events: events });
            var body = '';
            for(var k in data) {
                body += '&'+k+'='+encodeURIComponent(data[k]);
            }
            body = body.substring(1);
            var url = config.reportUrl+'/api/events/report.shtml';
            var xhr = new XMLHttpRequest()
            xhr.open('POST',url,true);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(body);
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        trace('report ... ok (' + JSON.parse(xhr.responseText || '{}').message + ')');
                        if (typeof callback == 'function') callback(true);
                    }else{
                        trace('report ... error (' + xhr.status + ')');
                        status.events = [].concat(events, status.events);
                        if (typeof callback == 'function') callback(false);
                    }
                }
            }
        }

        var _start = function() {
            if (!status.stop) return;
            status.stop = false;
            rrweb.record({
                emit:function(event) {
                    if(!status.stop){
                        status.events.push(event);
                    }
                },
            });
            status.timer = setInterval(_report, config.reportTimes * 1000);
        }

        var _stop = function(callback) {
            status.stop = true;
            clearInterval(status.timer);
            _report(function(state) {
                if (typeof callback == 'function') callback(state);
            });
        }

        this.report = function(data) {
            var crucial = [
                'goodsCode', //产品编码（必填）
                'goodsVersion', //产品版本
                'busCode', //业务编码
            ];
            var order = [
                'goodsName', //产品名称
                'orderNo', //订单号
                'policyNo', //保单号
                'applicantName', //投保人名
                'idNo', //投保证件
                'origin', //来源，和后台保持一致
            ];
            var c = false, u = {};
            for(var k in data) {
                if (crucial.indexOf(k) >= 0) { cache[k] = data[k]; c=1; }
                if (crucial.concat(order).indexOf(k) >= 0) u[k] = data[k];
            }
            if (c) _cache(true);
            if (JSON.stringify(u) != '{}') status.events.push({ type:'_customer_variable_', data:u});
        };


        this.start = function() {
            trace('start ...');
            if (!status.stop) {
                trace('start ... error (已在录制中，若要开始一个新的录制，请先使用 stop() 停止旧的录制)');
                return;
            }
            cache.recallCode = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, function() {return '0123456789abcdef'.charAt(Math.floor(Math.random() * 16))});
            _cache(true);
            _start();
        }

        this.leaveReport = function(callback) {
            trace('leave report ...');
            _stop(callback);
        }

        this.restoreReport = function() {
            trace('restore report ...');
            if (!status.stop) {
                trace('restore report ... error (已在录制中)');
                return;
            }
            if (!cache.recallCode) {
                trace('restore report ... error (回溯码不存在，无法继续录制)');
                return;
            }
            _start();
        }

        this.stop = function(callback){
            trace('stop ...');
            _stop(callback);
        }

        this.version = function() {
            var v = '1.1.1';
            trace('version ' + v)
            return v;
        }

        trace('instantiate ...');
        if (options) {
            for (var k in config) {
                if(options[k] !== undefined) config[k] = options[k];
            }
        }
        if (!window.MutationObserver) {
            if (config.notSupportEvent) {
                config.notSupportEvent();
            } else {
                alert(config.notSupportInfo);
                window.history.back();
            }
            return;
        }
        cache = _cache();
        trace('instantiate ... ok');

    };
}))