import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { MapPin, Navigation } from 'react-feather';
import { useForm } from 'react-hook-form';
import { SendMessageRequest } from 'src/api/portfolio/types';
import { useAppServices } from 'src/hooks/useAppServices';
import { useColorMode } from 'src/hooks/useColorMode';
import { usePortfolio } from 'src/hooks/usePortfolio';
import { SectionIdentifier } from 'src/types/sectionIdentifiers';
import { Section } from '../Section';
import { FormFields } from './types';

function ContactComponent(_props: Record<string, unknown>, ref: ForwardedRef<HTMLDivElement>) {
    const getColorMode = useColorMode();
    const defaultValues = useMemo<SendMessageRequest>(
        () => ({
            [FormFields.FullName]: '',
            [FormFields.SenderEmail]: '',
            [FormFields.Subject]: '',
            [FormFields.Text]: ''
        }),
        []
    );
    const {
        formState: { isSubmitting, isValid },
        handleSubmit,
        register
    } = useForm({ defaultValues });
    const { usersService } = useAppServices();
    const { citizenship, city, email, phone } = usePortfolio();

    const onSubmit = async (data: SendMessageRequest) => {
        await usersService.sendMessage(data);
    };

    return (
        <Section
            className='flex flex-col items-center w-full pt-[4rem]'
            description='Свяжитесь со мной, чтобы узнать больше о моем опыте и обсудить возможности сотрудничества'
            id={SectionIdentifier.Contact}
            ref={ref}
            title='Контакты'
        >
            <section className='grid 2xl:grid-cols-[minmax(50%,1fr),minmax(370px,max-content)] grid-cols-1 w-full gap-[1.25rem] mt-[3rem]'>
                <article
                    className={classNames(
                        'sm:p-[2.5rem] p-[2rem] w-full shadow-primary',
                        getColorMode('bg-white-50', 'bg-white-950')
                    )}
                >
                    <form
                        className='flex flex-col w-full gap-[1.5rem]'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label className='flex flex-col gap-[0.5rem]'>
                            <span
                                className={classNames(
                                    'typography-lg-regular',
                                    getColorMode(
                                        'text-text-secondary-500',
                                        'text-text-secondary-300'
                                    )
                                )}
                            >
                                Ваше имя
                            </span>
                            <input
                                {...register(FormFields.FullName)}
                                className={classNames(
                                    'w-full text-[1rem] h-[50px] px-[1.2rem] block',
                                    getColorMode(
                                        'text-text-primary-950 bg-primary-bg-lightness-100',
                                        'bg-primary-bg-darkness-950 text-text-primary-50'
                                    )
                                )}
                                type='text'
                            />
                        </label>
                        <label className='flex flex-col gap-[0.5rem]'>
                            <span
                                className={classNames(
                                    'typography-lg-regular',
                                    getColorMode(
                                        'text-text-secondary-500',
                                        'text-text-secondary-300'
                                    )
                                )}
                            >
                                Ваша почта
                            </span>
                            <input
                                {...register(FormFields.SenderEmail)}
                                className={classNames(
                                    'w-full text-[1rem] h-[50px] px-[1.25rem] block',
                                    getColorMode(
                                        'text-text-primary-950 bg-primary-bg-lightness-100',
                                        'bg-primary-bg-darkness-950 text-text-primary-50'
                                    )
                                )}
                                type='text'
                            />
                        </label>
                        <label className='flex flex-col gap-[0.5rem]'>
                            <span
                                className={classNames(
                                    'typography-lg-regular',
                                    getColorMode(
                                        'text-text-secondary-500',
                                        'text-text-secondary-300'
                                    )
                                )}
                            >
                                Тема
                            </span>
                            <input
                                {...register(FormFields.Subject)}
                                className={classNames(
                                    'w-full text-[1rem] h-[50px] px-[1.25rem] block',
                                    getColorMode(
                                        'text-text-primary-950 bg-primary-bg-lightness-100',
                                        'bg-primary-bg-darkness-950 text-text-primary-50'
                                    )
                                )}
                                type='text'
                            />
                        </label>
                        <label className='flex flex-col gap-[0.5rem]'>
                            <span
                                className={classNames(
                                    'typography-lg-regular',
                                    getColorMode(
                                        'text-text-secondary-500',
                                        'text-text-secondary-300'
                                    )
                                )}
                            >
                                Сообщение
                            </span>
                            <textarea
                                {...register(FormFields.Text)}
                                className={classNames(
                                    'w-full text-[1rem] min-h-[150px] overflow-y-auto px-[1.25rem] block',
                                    getColorMode(
                                        'text-text-primary-950 bg-primary-bg-lightness-100',
                                        'bg-primary-bg-darkness-950 text-text-primary-50'
                                    )
                                )}
                            />
                        </label>
                        <button
                            className='btn max-w-max'
                            disabled={isSubmitting || !isValid}
                            type='submit'
                        >
                            Отправить
                        </button>
                    </form>
                </article>
                <div className='flex flex-col gap-[1.25rem]'>
                    <article
                        className={classNames(
                            'p-[1.5rem] flex flex-col gap-[1.75rem] items-center',
                            getColorMode('bg-white-50', 'bg-white-950')
                        )}
                    >
                        <span className='bg-brand-500 text-text-primary-950 text-[1rem] flex items-center justify-center w-[40px] h-[40px] rounded-full'>
                            <MapPin height={18} width={18} />
                        </span>
                        <div className='flex flex-col gap-[1rem] w-full'>
                            <div className='flex max-sm:flex-col justify-between items-center sm:gap-[1.25rem] gap-[0.25rem]'>
                                <p
                                    className={classNames(
                                        'typography-lg font-medium',
                                        getColorMode('text-text-primary-950', 'text-white-50')
                                    )}
                                >
                                    Страна
                                </p>
                                <p
                                    className={classNames(
                                        'typography-md',
                                        getColorMode('text-text-primary-950', 'text-white-300')
                                    )}
                                >
                                    {citizenship}
                                </p>
                            </div>
                            <div className='flex max-sm:flex-col justify-between items-center sm:gap-[1.25rem] gap-[0.25rem]'>
                                <p
                                    className={classNames(
                                        'typography-lg font-medium',
                                        getColorMode('text-text-primary-950', 'text-white-50')
                                    )}
                                >
                                    Город
                                </p>
                                <p
                                    className={classNames(
                                        'typography-md',
                                        getColorMode('text-text-primary-950', 'text-white-300')
                                    )}
                                >
                                    {city}
                                </p>
                            </div>
                        </div>
                    </article>
                    <article
                        className={classNames(
                            'p-[1.5rem] flex flex-col gap-[1.75rem] items-center',
                            getColorMode('bg-white-50', 'bg-white-950')
                        )}
                    >
                        <span className='bg-brand-500 text-text-primary-950 text-[1rem] flex items-center justify-center w-[40px] h-[40px] rounded-full'>
                            <Navigation height={18} width={18} />
                        </span>
                        <div className='flex flex-col gap-[1rem] w-full'>
                            <div className='flex max-sm:flex-col justify-between items-center sm:gap-[1.25rem] gap-[0.25rem]'>
                                <p
                                    className={classNames(
                                        'typography-lg font-medium',
                                        getColorMode('text-text-primary-950', 'text-white-50')
                                    )}
                                >
                                    Email
                                </p>
                                <a
                                    className={classNames(
                                        'typography-md',
                                        getColorMode('text-text-primary-950', 'text-white-300')
                                    )}
                                    href={`mailto:${email}`}
                                >
                                    {email}
                                </a>
                            </div>
                            <div className='flex max-sm:flex-col justify-between items-center sm:gap-[1.25rem] gap-[0.25rem]'>
                                <p
                                    className={classNames(
                                        'typography-lg font-medium',
                                        getColorMode('text-text-primary-950', 'text-white-50')
                                    )}
                                >
                                    Телефон
                                </p>
                                <a
                                    className={classNames(
                                        'typography-md',
                                        getColorMode('text-text-primary-950', 'text-white-300')
                                    )}
                                    href={`tel:${phone}`}
                                >
                                    {phone}
                                </a>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </Section>
    );
}

export const Contact = observer(forwardRef(ContactComponent));
