import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNews, getNewsById, subscribeToNews } from '../src/services/supabaseService';
import Card from '../components/Card';
import { useLocalization } from '../contexts/LocalizationContext';

const NewsDetail: React.FC<{ article: any }> = ({ article }) => {
    const { t } = useLocalization();
    // Determine which image to use based on the article title
    const getImageUrl = (article: any) => {
        if (article.title === 'Ghana Welcomes the World: Accra to Host the 2025 World Scrabble Championship') {
            return '/kofiBingo.png';
        } else if (article.title === 'Future of African Scrabble Shines Bright as Nigeria Sweeps Youth Championship Titles') {
            return '/ayscbanner.png';
        } else if (article.title === 'Blitzkrieg Triumphs at Triumvirate Showdown in Nairobi') {
            return '/triumvirate.png';
        }
        return article.image;
    };

    const imageUrl = getImageUrl(article);

    return (
        <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-2xl p-5 sm:p-9 max-w-5xl mx-auto relative border border-slate-700/40 shadow-2xl content-group tech-card">
            <Link to="/news" className="text-green-400 hover:text-cyan-400 mb-5 sm:mb-9 inline-block font-bold transition-colors duration-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                {t('news.backToNews')}
            </Link>
            <div className="relative overflow-hidden rounded-xl mb-5 sm:mb-7">
                <img src={imageUrl} alt={article.title} className="w-full h-52 sm:h-80 object-cover rounded-xl mb-5 p-3 bg-slate-900/50" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-slate-900/70 to-transparent"></div>
            </div>
            <h1 className="font-orbitron text-3xl sm:text-5xl font-extrabold mb-5 text-gray-100 tracking-tight section-title">{article.title}</h1>
            <div className="flex flex-wrap gap-x-5 sm:gap-x-7 gap-y-3 text-cyan-400 mb-6 sm:mb-8 font-jetbrains-mono text-sm sm:text-base font-bold">
                <span className="bg-cyan-400/10 px-3 py-1.5 rounded-lg">{t('news.author')}: {article.author}</span>
                <span className="bg-green-400/10 px-3 py-1.5 rounded-lg">{t('news.published')}: {new Date(article.created_at).toLocaleDateString()}</span>
            </div>
            <div className="text-gray-300 leading-relaxed space-y-5 prose prose-invert prose-p:font-jetbrains-mono prose-lg max-w-none">
                <p className="text-base sm:text-lg">{article.content}</p>
            </div>
        </div>
    );
};

const NewsList: React.FC<{ articles: any[] }> = ({ articles }) => {
    const { t } = useLocalization();
    // Determine which image to use based on the article title
    const getImageUrl = (article: any) => {
        if (article.title === 'Ghana Welcomes the World: Accra to Host the 2025 World Scrabble Championship') {
            return '/kofiBingo.png';
        } else if (article.title === 'Future of African Scrabble Shines Bright as Nigeria Sweeps Youth Championship Titles') {
            return '/ayscbanner.png';
        } else if (article.title === 'Blitzkrieg Triumphs at Triumvirate Showdown in Nairobi') {
            return '/triumvirate.png';
        }
        return article.image;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 content-group">
            <div className="text-center mb-10 sm:mb-14 section-header">
                <h1 className="font-orbitron text-3xl sm:text-5xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 section-title">
                    {t('news.title')}
                </h1>
                <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto font-medium section-subtitle">
                    {t('news.subtitle')}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {articles.map(article => {
                    const imageUrl = getImageUrl(article);
                    return (
                        <Card
                            key={article.id}
                            title={article.title}
                            subtitle={`${t('news.published')}: ${new Date(article.created_at).toLocaleDateString()}`}
                            description={article.summary}
                            linkTo={`/news/${article.id}`}
                            imageUrl={imageUrl}
                        />
                    );
                })}
            </div>
            {articles.length === 0 && (
                <div className="text-center py-16 sm:py-20 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
                    <div className="max-w-md mx-auto">
                        <svg className="w-16 h-16 text-gray-600 mx-auto mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <h3 className="text-2xl font-bold text-gray-300 mb-3">{t('news.noNews')}</h3>
                        <p className="text-gray-500">
                            {t('news.checkBack')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

const NewsPage: React.FC = () => {
    const { t, language } = useLocalization();
    const { id } = useParams<{ id: string }>();
    const [articles, setArticles] = useState<any[]>([]);
    const [article, setArticle] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (id) {
                    // Fetch single article
                    const articleData = await getNewsById(id, language);
                    if (articleData) {
                        setArticle(articleData);
                    } else {
                        setError(t('news.articleNotFound'));
                    }
                } else {
                    // Fetch all articles
                    const articlesData = await getNews(language);
                    if (articlesData && articlesData.length > 0) {
                        setArticles(articlesData);
                    } else {
                        setError(t('news.noNews'));
                    }
                }
            } catch (err) {
                setError(t('error'));
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, language, t]);

    // Subscribe to real-time updates
    useEffect(() => {
        if (!id) { // Only subscribe on the list page, not the detail page
          const unsubscribe = subscribeToNews(
            (updatedArticles) => {
              // Filter articles by language
              const filteredArticles = updatedArticles.filter((article: any) => 
                article.language === language
              );
              setArticles(filteredArticles.length > 0 ? filteredArticles : updatedArticles.filter((article: any) => article.language === 'en'));
              setIsSubscribed(true);
            },
            (error) => {
              console.error('Real-time subscription error:', error);
              setIsSubscribed(false);
            },
            language
          );

          return () => {
            unsubscribe();
          };
        }
      }, [id, language]);

    if (loading) {
        return (
            <div className="py-8 sm:py-12">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8 sm:py-12">
                <div className="flex justify-center items-center h-64">
                    <div className="text-red-400 bg-red-900/30 px-6 py-4 rounded-xl border border-red-700/50">
                        <p className="font-bold text-lg mb-2">{t('error')}</p>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8 sm:py-12">
            {id ? (
                article ? <NewsDetail article={article} /> : <div className="text-center py-12 text-red-400">{t('news.articleNotFound')}</div>
            ) : (
                <NewsList articles={articles} />
            )}
        </div>
    );
};

export default NewsPage;