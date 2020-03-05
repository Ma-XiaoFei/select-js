function initSelect(option) {
    let {el, data, isSameCase} = option;
    
    console.log(data)
    el = document.querySelector(el);

    function view(val) {
        let str = ``;
        data.filter(item => {
            if (isSameCase) {
                return item.toUpperCase().includes(val.toUpperCase())
            }
            return item.includes(val)
        }).forEach(item => {
            let attr = item;
            let ignore = option.isSameCase ? "gi" : 'g';
            item = item.replace(new RegExp(`(${val})`, ignore), function (...a) {
                return `<span style="color:red; font-size: 23px">${a[1]}</span>`
            })
            str += `<li data-value=${attr}>${item}</li>`
        })
        if (!str.length) str += `<li data-value='' style="color: #fff; text-align: center">无数据</li>`
        let Ul = document.createElement('ul');
        Ul.innerHTML = str;
        Ul.id = 'ul'
        Ul.style.maxHeight = '200px'
        Ul.style.overflow = 'scroll'
        document.getElementById('ul') ? document.getElementById('ul').remove() : '';
        Ul.onclick = function (e) {
            let target = e.target.nodeName;
            if (target === 'LI' || target === 'SPAN') {
                let dataValue = target === "SPAN" ? e.target.parentElement.getAttribute('data-value') : e
                    .target.getAttribute('data-value');
                console.log(dataValue)
                el.value = dataValue
                Ul.style.display = 'none'

            }

        }
        el.after(Ul);
    }


    el.oninput = function (e) {

        let val = e.target.value;
        view(val)

    }
    document.documentElement.onclick = function (e) {

        if (e.target.nodeName === 'SPAN' || e.target === el || e.target.tagName === 'UL' || e.target
            .tagName === 'LI') return;

        document.getElementById('ul') ? document.getElementById('ul').remove() : '';

    }
    el.onfocus = function (e) {
        view(e.target.value)
    }


}