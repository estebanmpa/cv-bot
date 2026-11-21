import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export const PROJECT_TYPES = [
    'new-product',
    'existing-product',
    'ai-integration',
    'legacy-system',
    'part-time-role',
    'other',
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export class ContactRequestDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name!: string;

    @IsEmail()
    @MaxLength(200)
    email!: string;

    @IsIn(PROJECT_TYPES)
    projectType!: ProjectType;

    @IsString()
    @IsNotEmpty()
    @MaxLength(2000)
    message!: string;

    // Honeypot: hidden from people, so only bots fill it in.
    @IsOptional()
    @IsString()
    website?: string;
}
