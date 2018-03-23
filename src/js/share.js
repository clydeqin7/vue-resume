Vue.component('share', {
    props: ['sharelink'],
    template:`
        <div class="share"  >
            <h2>将下列链接分享给面试官</h2>
            <textarea name="" id="" cols="40" rows="5" readonly='readonly' resize='none'>{{sharelink}}</textarea>
            <div>
                <button @click="$emit('copylink')">复制</button>
                <button @click="$emit('closeshare')">取消</button>
            </div>
        </div>    
    `,
})