import React from 'react';
import {Landing} from "../components/landing";
import {About} from "../components/about";
import {Projects} from "../components/projects";
import {Qualifications} from "../components/qualifications";
import {Skills} from "../components/skills";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import {Blog} from "../components/blog";


export async function getStaticProps() {
    /*Projects*/
    const projectFiles = fs.readdirSync('projects/content');
    const projects = projectFiles.map((fileName) => {

        const slug = fileName.replace('.md', '');

        const readFile = fs.readFileSync(`projects/content/${fileName}`, 'utf-8');
        const {data: frontmatter} = matter(readFile);
        return {
            slug, frontmatter,
        };
    });



    /*Blogs*/
    const files = fs.readdirSync('blog/content');
    const posts = files.map((fileName) => {

        const slug = fileName.replace('.md', '');

        const readFile = fs.readFileSync(`blog/content/${fileName}`, 'utf-8');
        const {data: frontmatter} = matter(readFile);
        return {
            slug, frontmatter,
        };
    });

    return {
        props: {
            posts,
            projects
        },
    };
}

export default function Home({posts, projects}) {
    console.log({projects})
    return (<div>
            <Landing/>
            <About/>
            <Projects projects={projects}/>
            <Qualifications/>
            <Skills/>
            <Blog posts={posts}/>
        </div>
    )
}
