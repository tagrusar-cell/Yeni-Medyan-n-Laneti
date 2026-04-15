/**
 * Yeni Medyanın Laneti - Arama Motoru Altyapısı
 * Tüm yazı içeriklerini indeksler ve gerçek zamanlı arama sağlar.
 */

const articlesIndex = [
    {
        id: 'article-1',
        title: 'Sanat Yapıtının Solan Yaprakları',
        tags: ['Sanat ve Estetik', 'Tüketim Toplumu'],
        excerpt: 'Sanat yapıtlarının, özellikle de görsel sanatların bir büyüsü olduğu tartışılmaz bir gerçektir. Bin bir emek ile üretilmiş o zengin objeler...',
        content: 'Sanat yapıtlarının, özellikle de görsel sanatların bir büyüsü olduğu tartışılmaz bir gerçektir. Vincent van Gogh Yıldızlı Gece Mona Lisa Leonardo da Vinci Louvre Müzesi aura reprodüksiyon yeniden üretim kült değeri ritüellik kapitalizm metalaşma'
    },
    {
        id: 'article-2',
        title: 'Yeni Medyanın Dişlileri',
        tags: ['Yeni Medya', 'Dijital Kültür'],
        excerpt: 'Yeni medya hiç şüphesiz ki hayatımızın büyük bir parçasını etkilemektir. Ne var ki, insanların neyin yeni medya olduğu...',
        content: 'Lev Manovich Yeni Medyanın Dili sayısal temsil binary ikili kod birimsellik otomasyon değişkenlik eş yaratıcı algoritma şablon'
    },
    {
        id: 'article-3',
        title: 'Tele, Tele ve Tele: Tele dünyaya giriş',
        tags: ['Gösteri Toplumu', 'Dijital Gözetim', 'Tele part 1'],
        excerpt: 'Yeni medya çağında gerçekliğin sınırlarının zorlandığı doğrudur. Ne gerçek ne değil, hala kestirilebilse de ikili arasındaki ayrımın inceldiği aşikardır...',
        content: 'simülasyon simülakr gerçeklik Jean Baudrillard sirenlerin şarkısı Big Brother Omniptikon minyatürleşme hız enformasyon yığını'
    },
    {
        id: 'article-4',
        title: 'Tele, Tele ve Tele: Tele dünyanın çarklıları',
        tags: ['Dijital Kültür', 'Sanat ve Estetik', 'Tele part 2'],
        excerpt: 'Bizi gözümüzden başlayarak kendi içinde hapseden ekranlar bizleri bir o kadar da sanal dünyada özgür kılar. Onun diyalektik yapısı da buradan gelir...',
        content: 'tele görme tele bulunma tele eylem drone kamera göz ampütasyonlaşma omnipresence omnipotence gamification'
    },
    {
        id: 'article-5',
        title: 'Hız ile Yiten Anlam',
        tags: ['Yeni Medya', 'Tüketim Toplumu', 'meta fetişizmi part 1'],
        excerpt: 'Yeni medyaya tek bir anlam atfedecek olsak bu kesinlikle hız olurdu. Yeni medya, geçmiş dönemlerdeki zincirleri kırmış, insanları akışın birer parçası haline getirmiştir...',
        content: 'dikkat ekonomisi McDonaldlaşma George Ritzer verimlilik standartizasyon hesaplanabilirlik risksizlik aynılığın büyüsü'
    },
    {
        id: 'article-6',
        title: 'Yeni Medyanın Terazisi',
        tags: ['Yeni Medya', 'Dijital Gözetim', 'meta fetişizmi part 2'],
        excerpt: 'Medya için devasa boyutlara ulaşmış, kitlesel ve anlık bir gazete diyebiliriz. Medya çağının bizlere kazandırdığı hız ve anlılık onun en karakteristik özelliklerinden biridir...',
        content: 'medya okuryazarlığı ekonomi politik eşik bekçileri emek sömürüsü yabancılaşma kişiselleştirilme tüketim zombisi'
    },
    {
        id: 'article-7',
        title: 'Tüketiciyi Tüketen Olgu',
        tags: ['Tüketim Toplumu', 'Dijital Kültür', 'meta fetişizmi part 3'],
        excerpt: 'Meta fetişizmi sadece bir terim olmanın ötesinde sosyal ilişkileri ilgilendiren bir olgudur. Tüketim toplumunda; adil, dürüst ve güvenilirlik gibi kişilik özellikleri...',
        content: 'meta fetişizmi influencer gösteri toplumu metazanlık kimlik inşası statü sembolü katarsis sömürü'
    },
    {
        id: 'article-8',
        title: 'Meta Fetişizminin Gösterisi (final act)',
        tags: ['Gösteri Toplumu', 'Tüketim Toplumu', 'meta fetişizmi part 4'],
        excerpt: 'Tüketim toplumu hayatta kalabilmek için birçok yakıta ihtiyaç duyar. Birçoklarımızın aklına metalar gelebilir...',
        content: 'Homo erectus Homo faber Homo Spectaculum dijital köy Omniptikon mahremiyet müstehcenlik Truman Show misyonerlik'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Arama UI Elemanlarını Oluştur
    const searchOverlay = document.createElement('div');
    searchOverlay.id = 'searchOverlay';
    searchOverlay.className = 'search-overlay';
    searchOverlay.innerHTML = `
        <button class="search-close" id="closeSearch">&times;</button>
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Yazılarda ara (başlık, kavram, içerik...)" autocomplete="off">
            <div id="searchResults" class="search-results"></div>
        </div>
    `;
    document.body.appendChild(searchOverlay);

    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Aç/Kapat Fonksiyonları
    const openSearch = () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 100);
        document.body.style.overflow = 'hidden';
    };

    const closeSearchOverlay = () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        searchResults.innerHTML = '';
    };

    // Tüm arama tetikleyicilerini yakala (header ve modal içindekiler)
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('#searchTrigger') || e.target.closest('.modal-search-btn');
        if (trigger) {
            openSearch();
        }
    });

    if (closeSearch) closeSearch.onclick = closeSearchOverlay;

    // ESC ile kapatma
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearchOverlay();
        }
    });

    // Arama Mantığı
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        // Modal açıksa metin içi vurgulama yap
        highlightInModal(query);

        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const filtered = articlesIndex.filter(article => 
            article.title.toLowerCase().includes(query) || 
            article.content.toLowerCase().includes(query) ||
            article.excerpt.toLowerCase().includes(query)
        );

        renderResults(filtered, query);
    });

    // Metin içi vurgulama fonksiyonu
    const highlightInModal = (query) => {
        const modal = document.getElementById('article-modal');
        const modalBody = document.getElementById('modal-body');
        
        if (!modal || !modal.classList.contains('active') || !modalBody) return;

        // Orijinal içeriği sakla (henüz saklanmadıysa)
        if (!modalBody.getAttribute('data-original')) {
            modalBody.setAttribute('data-original', modalBody.innerHTML);
        }

        const originalHTML = modalBody.getAttribute('data-original');

        if (!query || query.length < 2) {
            modalBody.innerHTML = originalHTML;
            return;
        }

        // HTML etiketlerini bozmadan metni bul ve vurgula
        try {
            const regex = new RegExp(`(${query})`, 'gi');
            // Sadece metin düğümlerinde (text nodes) değişiklik yapmak en sağlıklısıdır 
            // ama basitlik için şimdilik içerik içindeki kelimeleri güvenli bir regex ile değiştiriyoruz
            // Not: < > etiketleri arasındaki metni korumak için ileri düzey regex veya DOM traversal gerekir.
            // Burada kullanıcı deneyimi için içeriği güncelliyoruz.
            const highlightedHTML = originalHTML.replace(regex, '<mark class="text-match">$1</mark>');
            modalBody.innerHTML = highlightedHTML;
        } catch (e) {
            console.error("Vurgulama hatası:", e);
        }
    };

    const renderResults = (results, query) => {
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="search-no-results">Eşleşen yazı bulunamadı.</p>';
            return;
        }

        searchResults.innerHTML = results.map(article => `
            <div class="search-result-item" onclick="navigateToArticle('${article.id}')">
                <h3>${highlightText(article.title, query)}</h3>
                <p>${highlightText(article.excerpt, query)}</p>
            </div>
        `).join('');
    };

    const highlightText = (text, query) => {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    };

    window.navigateToArticle = (id) => {
        const isYazilarPage = window.location.pathname.includes('yazilar.html');
        if (isYazilarPage) {
            closeSearchOverlay();
            
            // Eğer Modal zaten açıksa ve aynı makale ise sadece kapat/aç yapma, odağı oraya ver
            const currentModalTitle = document.getElementById('modal-title').innerText;
            const targetArticle = articlesIndex.find(a => a.id === id);
            
            // Modalı açan butonu bul ve tıkla
            const btn = document.querySelector(`[data-article="${id}"]`);
            if (btn) {
                btn.click();
                // Arama kutusundaki sorguyu temizleme, vurgulama kalsın
                setTimeout(() => highlightInModal(searchInput.value), 100);
            }
        } else {
            // Başka sayfadaysak parametre ile git
            window.location.href = `yazilar.html?article=${id}`;
        }
    };

    // URL Parametresi Kontrolü (Sadece Yazılar sayfasında)
    if (window.location.pathname.includes('yazilar.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('article');
        if (articleId) {
            setTimeout(() => {
                const btn = document.querySelector(`[data-article="${articleId}"]`);
                if (btn) btn.click();
            }, 500);
        }
    }
});
