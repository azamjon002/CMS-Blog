import { Badge } from '@/components/ui/badge'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { getAllCategory } from '@/service/category.service'
import { getAllTags } from '@/service/tag.service'
import { Minus, Search } from 'lucide-react'
import Link from 'next/link'

async function GlobalSearch() {

	const popularCategories = await getAllCategory()
	const popularTags = await getAllTags()

	return (
		<Drawer>
			<DrawerTrigger>
				<div className='hover:bg-blue-400/20 cursor-pointer rounded-sm transition-colors flex items-center gap-1 px-3 py-2'>
					<span className='hidden md:flex'>Search</span>
					<Search className='w-4 h-4' />
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<div className='container max-w-6xl mx-auto py-12'>
					<Input
						className='bg-secondary'
						placeholder='Type to search blog...'
					/>

					<div className='flex flex-col space-y-2 mt-4'>
						<div className='flex items-center gap-4'>
							<p className='font-creteRound text-2xl'>See posts by categories</p>
							<Minus />
							<Link className='text-blue-400 underline hover:opacity-80' href='/categories'>
								<span>
									<DrawerClose>
										See all
									</DrawerClose>
								</span>
							</Link>
						</div>
						<div className='flex flex-wrap gap-2'>
							{popularCategories.map(item => (
								<Link href={`/categories/${item.slug}`}>
									<Badge key={item.slug} variant={'secondary'}>
										<DrawerClose>
											{item.name}
										</DrawerClose>
									</Badge>
								</Link>
							))}
						</div>
					</div>

					<div className='flex flex-col space-y-2 mt-4'>
						<div className='flex items-center gap-4'>
							<p className='font-creteRound text-2xl'>See posts by tags</p>
							<Minus />
							<Link className='text-blue-400 underline hover:opacity-80' href='/tags'>
								<span>
									<DrawerClose>
										See all
									</DrawerClose>
								</span>
							</Link>
						</div>
						<div className='flex flex-wrap gap-2'>
							{popularTags.map(item => (
								<Link href={`/tags/${item.slug}`}>
									<Badge key={item.slug} variant={'secondary'}>
										<DrawerClose>
											{item.name}
										</DrawerClose>
									</Badge>
								</Link>
							))}
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

export default GlobalSearch
