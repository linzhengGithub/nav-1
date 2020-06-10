const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x"); //尝试读取x，得到x
console.log(x)
const xObject = JSON.parse(x); //字符串重新变成对象
console.log(xObject)
const hasMap = xObject || [{ logo: "A", url: "https://www.acfun.cn" }];

const simplifyUrl = (url) => {
  return url.replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hasMap.forEach((node,index) => {
    const $li = $(`<li>
                   <div class="site">
                       <div class="logo">
                           ${node.logo[0]}
                       </div>
                       <div class="link">
                           ${simplifyUrl(node.url)}
                       </div>
                           <div class="close">
                               <svg class="icon">
                                 <use xlink:href="#icon-close"></use>
                                </svg>
                    </div>
                 </div>
        </li>`).insertBefore($lastLi);
        $li.on('click',() => {
            window.open(node.url)
        })
        $li.on('click','.close',(e) => {
            e.stopPropagation(); //阻止冒泡
            hasMap.splice(index,1)
            render();
        })
  });
};

render();
$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是：");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hasMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
  window.onbeforeunload = () => {
    const string = JSON.stringify(hasMap); //把hasMap变成字符串
    console.log(string)
    localStorage.setItem("x", string); //设置一个x，把string存起来
  };
});


// $(document).on('keypress',(e) => {
//     const {key} = e     //等于 const key = e.key
//     for(let i = 0;i<hasMap.length;i++){
//         if(hasMap[i].logo.toLowerCase() === key){
//             window.open(hasMap[i].url)
//         }
//     }
// })
