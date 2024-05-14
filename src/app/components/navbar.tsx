"use client"

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
	const [navBar, setNavBar] = useState(false);

	const links = [
		{
			name: "Pokémon",
			url: "/",
		},
		{
			name: "Berries",
			url: "berries",
		},
		{
			name: "Items",
			url: "items",
		},
	];

	return (
		<nav className="flex justify-end items-center w-full h-24 px-5 shadow">
			<ul className="hidden md:flex">
				{links.map(({ url, name }) => (
					<li className="nav-links px-4 cursor-pointer capitalize font-medium text-pink-500 hover:text-white duration-200 link-underline" >
						<Link href={url}>{name}</Link>
					</li>
				))}
			</ul>
			<div onClick={() => setNavBar(!navBar)} className="cursor-pointer pr-4 z-10 text-pink-500 md:hidden">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>
      </div>
      {navBar && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-white to-pink-300 text-white md:hidden">
          {links.map(({ name }) => (
            <li className="px-4 cursor-pointer capitalize py-6 text-4xl" >
              <Link onClick={() => setNavBar(!navBar)} href={name}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
			)}
		</nav>
	)
}