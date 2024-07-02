import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useColorMode } from 'src/hooks/useColorMode';

function BlogComponent() {
    const getColorMode = useColorMode();

    return (
        <>
            <section
                className={classNames(
                    'shadow-primary grid grid-cols-1 grid-rows-1 bg-cover bg-no-repeat bg-center min-h-[400px]',
                    getColorMode('bg-white-50', 'bg-shark-950')
                )}
                style={{
                    backgroundImage: `url('https://img.freepik.com/free-photo/businesswoman-working-laptop-hands-typing-keyboard-top-view_1163-4667.jpg?t=st=1717200546~exp=1717204146~hmac=d1702fe0bf68f9f91e3dc363c2e174b4f67bb762d5db4dd5dcea1d1fd2130056&w=2000')`
                }}
            >
                <div className='bg-shark-950 bg-opacity-60 h-full w-full flex items-center justify-center'>
                    <h3
                        className={classNames(
                            'typography-xl mt-[1.5rem] text-center text-text-primary-50'
                        )}
                    >
                        Блог
                    </h3>
                </div>
            </section>
            <section className='mt-[2.5rem]'>
                <p
                    className={classNames(
                        'text-[1.25rem]',
                        getColorMode('', 'text-text-primary-50')
                    )}
                >
                    Описание
                </p>
            </section>
        </>
    );
}

export const Blog = observer(BlogComponent);
