<script>
    import PublicLayout from '../../components/page/public-layout.svelte';
    import {
        Tile,
        Grid,
        Row,
        Column,
        FormGroup,
        TextInput,
        PasswordInput,
        Form,
        Button,
        ButtonSet,
        InlineNotification,
        breakpointObserver,
    } from 'carbon-components-svelte';
    import Login from 'carbon-icons-svelte/lib/Login.svelte';

    let passwordConfirm;
    let email;
    let password;
    let errors;
    let loading = false;
    const size = breakpointObserver();

    const handleRegister = async (e) => {
        loading = true;
        errors = [];
        e.preventDefault();
        const fetchResult = await fetch('http://localhost:8080/api/user/register', {
            method: 'POST',
            body: JSON.stringify({
                Email: email,
                Password: password,
                PasswordConfirm: passwordConfirm,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await fetchResult.json();
        errors = result.Error;
        loading = false;
    };
</script>

<PublicLayout>
    <Grid style="margin-top: 5rem" fullWidth>
        <Row>
            <Column xlg={{ span: 8, offset: 4 }} lg={{ span: 10, offset: 3 }} md={{ span: 6, offset: 1 }} sm={{ span: 8, offset: 0 }}>
                <Tile>
                    <h2 style="margin-bottom:2rem">Register</h2>
                    {#if errors}
                        {#each errors as error}
                            <InlineNotification title={error.ErrorNumber} subtitle={error.Message} />
                        {/each}
                    {/if}
                    <Form on:submit={handleRegister}>
                        <FormGroup>
                            <TextInput bind:value={email} labelText="Email" />
                        </FormGroup>
                        <FormGroup>
                            <PasswordInput bind:value={password} labelText="Password" />
                        </FormGroup>
                        <FormGroup>
                            <PasswordInput bind:value={passwordConfirm} labelText="Password Confirm" />
                        </FormGroup>
                        <ButtonSet stacked={$size === 'md' || $size === 'sm'}>
                            <Button bind:loading size="lg" type="submit" icon={Login}>Register</Button>
                            <Button bind:loading kind="ghost" href="/user/login">Already have an account?</Button>
                            <Button bind:loading kind="ghost" href="/user/forgotpassword">Forgot your password?</Button>
                        </ButtonSet>
                    </Form>
                </Tile>
            </Column>
        </Row>
    </Grid>
</PublicLayout>
